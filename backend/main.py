
from fastapi import FastAPI, Depends, Depends, HTTPException, Path
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from utils.security import SecurityUtils
from model.schemas import CommentResponse, LikeCreate, LikeResponse, PostResponse, UserResponse
from model import models
from database import engine, get_db
from typing import Optional, Dict, Any
from openai import OpenAI
import os
import re
from dotenv import load_dotenv
from routes import auth, data

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Calmiary API",
    description="""
  Calmiary 서비스의 Backend API 문서입니다.
  """,
  version="1.0.0",
  contract={
    "github": "https://github.com/prgrms-fe-devcourse/NFE1-1-3-Calmiary"
  }

)

app.include_router(data.router)
app.include_router(auth.router)

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class UserCreate(BaseModel):
    id: str
    nickname: str
    password: str
    profile_image: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "test123",
                "nickname": "테스트유저",
                "password": "test123!@#",
                "profile_image": None
            }
        }

@app.post("/user/add/", 
    response_model=UserResponse,
    summary="새로운 사용자 추가",
    description="""
    새로운 사용자를 생성합니다.
    
    - **id**: 고유한 사용자 아이디
    - **nickname**: 사용자 닉네임
    - **password**: 사용자 비밀번호
    - **profile_image**: (선택) 프로필 이미지 URL
    """,
    response_description="생성된 사용자 정보",
    tags=["Users"]
)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    # 기존 사용자 확인
    existing_user = db.query(models.User).filter(models.User.id == user_data.id).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="이미 등록된 아이디입니다."
        )

    # 비밀번호 해싱
    hashed_password = SecurityUtils.get_password_hash(user_data.password)
    
    # 사용자 생성
    db_user = models.User(
        id=user_data.id,
        nickname=user_data.nickname,
        password=hashed_password,
        profile_image=user_data.profile_image
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="사용자 생성 중 오류가 발생했습니다."
        )

class PostCreate(BaseModel):
    user_id: int
    emotion_type: str
    content: str


@app.post("/post/write/",
    response_model=PostResponse,
    summary="새로운 포스트 작성",
    description="""
    사용자의 걱정거리를 포스트로 작성하고 AI의 응답을 받습니다.
    
    - **user_id**: 작성자 ID
    - **emotion_type**: 현재 감정 상태
    - **content**: 걱정거리 내용
    
    AI가 자동으로 위로와 조언을 생성하여 응답합니다.
    """,
    response_description="작성된 포스트 정보와 AI 응답",
    tags=["Posts"]
)
def create_post(
    post_data: PostCreate,
    db: Session = Depends(get_db)
):
    
  try:
      response = client.chat.completions.create(
          model="gpt-4o-mini",
          messages=[
              {"role": "system", "content": "당신은 사용자의 걱정을 들어주고, 친근하게 위로와 격려를 해주는 도우미예요. 항상 해요체를 사용해 주세요. 응답은 '위로'와 '제안'으로 구분해서 작성해 주세요. 그리고 위로와 제안의 응답은 각각 최소한 하나씩 제공되어야 해요"},
              {"role": "user", "content": f"오늘 제가 걱정한 건: {post_data.content}. 저 좀 위로해 주실 수 있을까요? 아니면 어떻게 해결하면 좋을까요?"}
          ]
      )

      gpt_response = response.choices[0].message.content
      comfort, suggestion = parse_gpt_response(gpt_response)

      ai_content = f"{comfort}\n\n {suggestion}"

  except Exception as e:
        ai_content = "AI 응답을 생성하는 중 오류가 발생했습니다."

  db_post = models.Post(
      user_id=post_data.user_id,
      emotion_type=post_data.emotion_type,
      content=post_data.content,
      ai_content=ai_content
  )
  db.add(db_post)
  db.commit()
  db.refresh(db_post)
  return db_post

@app.get("/post/get/{post_id}",
    response_model=PostResponse,
    summary="포스트 조회",
    description="지정된 ID의 포스트를 조회합니다.",
    response_description="포스트 상세 정보",
    tags=["Posts"]
)
def get_post(
    post_id: int = Path(..., description="조회할 포스트의 ID", example=1),
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.delete("/post/remove/{post_id}",
    response_model=dict,
    summary="포스트 삭제",
    description="지정된 ID의 포스트를 삭제합니다.",
    response_description="삭제 완료 메시지",
    tags=["Posts"]
)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}

@app.post("/comment/add/",
    response_model=CommentResponse,
    summary="새로운 댓글 작성",
    description="""
    포스트에 새로운 댓글을 작성합니다.
    
    - **user_id**: 댓글 작성자 ID
    - **post_id**: 댓글을 달 포스트 ID
    - **content**: 댓글 내용
    
    작성된 댓글은 즉시 포스트에 표시됩니다.
    """,
    response_description="작성된 댓글 정보",
    tags=["Comments"]
)
def create_comment(
    user_id: int,
    post_id: int,
    content: str,
    db: Session = Depends(get_db)
):
    db_comment = models.Comment(
        user_id=user_id,
        post_id=post_id,
        content=content
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

@app.get("/comment/get/{comment_id}",
    response_model=CommentResponse,
    summary="댓글 조회",
    description="지정된 ID의 댓글을 조회합니다.",
    response_description="댓글 상세 정보",
    tags=["Comments"]
)
def get_comment(
    comment_id: int = Path(..., description="조회할 댓글의 ID", example=1),
    db: Session = Depends(get_db)
):
    comment = db.query(models.Comment).filter(models.Comment.comment_id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

@app.delete("/comment/remove/{comment_id}",
    response_model=dict,
    summary="댓글 삭제",
    description="""
    지정된 ID의 댓글을 삭제합니다.
    
    삭제된 댓글은 복구할 수 없으며, 해당 댓글과 관련된 모든 데이터가 함께 삭제됩니다.
    """,
    response_description="삭제 완료 메시지",
    tags=["Comments"],
    responses={
        200: {
            "description": "댓글이 성공적으로 삭제됨",
            "content": {
                "application/json": {
                    "example": {"message": "댓글이 삭제되었습니다."}
                }
            }
        },
        404: {
            "description": "댓글을 찾을 수 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "댓글을 찾을 수 없습니다."}
                }
            }
        }
    }
)
def delete_comment(
    comment_id: int = Path(..., description="삭제할 댓글의 ID", example=1),
    db: Session = Depends(get_db)
):
    comment = db.query(models.Comment).filter(models.Comment.comment_id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="댓글을 찾을 수 없습니다.")
    db.delete(comment)
    db.commit()
    return {"message": "댓글이 삭제되었습니다."}

@app.post("/like/add",
    response_model=LikeResponse,
    summary="좋아요 추가",
    description="""
    포스트에 좋아요를 추가합니다.
    
    - **user_id**: 좋아요를 누른 사용자 ID
    - **post_id**: 좋아요를 받은 포스트 ID
    
    동일한 사용자가 같은 포스트에 중복으로 좋아요를 누를 수 없습니다.
    """,
    response_description="추가된 좋아요 정보",
    tags=["Likes"]
)
def create_like(like_data: LikeCreate, db: Session = Depends(get_db)):
    existing_like = db.query(models.Like).filter(
        models.Like.user_id == like_data.user_id,
        models.Like.post_id == like_data.post_id
    ).first()
    if existing_like:
        raise HTTPException(
            status_code=400, 
            detail="이미 이 포스트에 좋아요를 누르셨습니다."
        )
    
    db_like = models.Like(**like_data.model_dump())
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like

@app.delete("/like/remove/{like_id}",
    response_model=dict,
    summary="좋아요 삭제",
    description="지정된 ID의 좋아요를 삭제합니다(좋아요 취소).",
    response_description="삭제 완료 메시지",
    tags=["Likes"]
)
def delete_like(
    like_id: int = Path(..., description="삭제할 좋아요의 ID", example=1),
    db: Session = Depends(get_db)
):
    like = db.query(models.Like).filter(models.Like.id == like_id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(like)
    db.commit()
    return {"message": "좋아요가 취소되었습니다."}

def remove_markdown(text):
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
    text = re.sub(r'\*(.+?)\*', r'\1', text)
    text = re.sub(r'`(.+?)`', r'\1', text)
    text = re.sub(r'~~(.+?)~~', r'\1', text)
    text = re.sub(r'\[(.+?)\]\(.+?\)', r'\1', text)
    text = re.sub(r'#+\s*(.+)', r'\1', text)
    text = re.sub(r'^\s*[-*+]\s', '', text, flags=re.MULTILINE)
    return text.strip()

def parse_gpt_response(response: str) -> Dict[str, str]:
    parts = response.split("제안")
    comfort = parts[0].strip()
    suggestion = parts[1].strip() if len(parts) > 1 else "제안이 제공되지 않았습니다."
    
    comfort = comfort.replace("위로", "", 1).strip()
    comfort = comfort.replace(":", "", 1).strip()
    suggestion = suggestion.replace(":", "", 1).strip()
    
    comfort = remove_markdown(comfort)
    suggestion = remove_markdown(suggestion)
    
    return comfort, suggestion

@app.get("/", response_class=HTMLResponse)
async def root():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Calmiary API Documentation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                border-bottom: 2px solid #007bff;
                padding-bottom: 10px;
            }
            .doc-links {
                display: flex;
                gap: 20px;
                margin: 20px 0;
            }
            .doc-link {
                display: inline-block;
                padding: 12px 24px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .doc-link:hover {
                background-color: #0056b3;
            }
            .api-section {
                margin: 20px 0;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 5px;
            }
            .endpoint {
                margin: 10px 0;
                padding: 10px;
                background-color: white;
                border-left: 4px solid #28a745;
            }
            .method {
                font-weight: bold;
                color: #28a745;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌙 Calmiary API Documentation</h1>
            
            <p>
                Calmiary는 사용자들의 걱정과 고민을 AI가 위로해주는 서비스입니다.
                이 API는 Calmiary 서비스의 백엔드를 담당하고 있습니다.
            </p>

            <div class="doc-links">
                <a href="/docs" class="doc-link">Swagger UI</a>
                <a href="/redoc" class="doc-link">ReDoc</a>
            </div>

            <div class="api-section">
                <h2>주요 기능</h2>
                <div class="endpoint">
                    <span class="method">POST</span> /user/add/ - 새로운 사용자 등록
                </div>
                <div class="endpoint">
                    <span class="method">POST</span> /post/write/ - 걱정거리 작성 및 AI 응답 받기
                </div>
                <div class="endpoint">
                    <span class="method">POST</span> /comment/add/ - 댓글 작성
                </div>
                <div class="endpoint">
                    <span class="method">POST</span> /like/add/ - 공감하기
                </div>
            </div>

            <div class="api-section">
                <h2>API 문서 안내</h2>
                <p>
                    - <strong>Swagger UI</strong>: 대화형 API 문서와 테스트 도구를 제공합니다.<br>
                    - <strong>ReDoc</strong>: 보기 편한 형태의 상세 API 문서를 제공합니다.
                </p>
            </div>

            <div class="api-section">
                <h2>GitHub Repository</h2>
                <p>
                    <a href="https://github.com/prgrms-fe-devcourse/NFE1-1-3-Calmiary" target="_blank">
                        https://github.com/prgrms-fe-devcourse/NFE1-1-3-Calmiary
                    </a>
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    return html_content
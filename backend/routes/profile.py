from enum import Enum
from fastapi import APIRouter, Depends, HTTPException, Query, status, File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, asc
from typing import List, Optional
from database import get_db
from model import models
from model.schemas import MessageResponse, PostResponse, UserResponse
from pydantic import BaseModel, Field
from utils.security import SecurityUtils
import os
import aiohttp
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/profile", tags=["Profile"])

# 프로필 수정 관련 스키마
class ProfileUpdate(BaseModel):
    nickname: Optional[str] = Field(None, min_length=2, max_length=20)
    password: Optional[str] = Field(None, min_length=6)
    # current_password: str = Field(..., description="현재 비밀번호")

    class Config:
        json_schema_extra = {
            "example": {
                "nickname": "새로운닉네임",
                "password": "newpassword123",
                # "current_password": "oldpassword123"
            }
        }

class SortOption(str, Enum):
    LATEST = "latest"
    COMMENTS = "comments"
    LIKES = "likes"
    OLDEST = "oldest"

class ProfilePostsFilter(BaseModel):
    sort_by: Optional[SortOption] = SortOption.LATEST
    page: int = Field(default=1, ge=1)
    limit: int = Field(default=10, ge=1, le=100)

    class Config:
        json_schema_extra = {
            "example": {
                "sort_by": "latest",
                "page": 1,
                "limit": 10
            }
        }


# 공유한 게시글 조회
@router.get("/posts/shared/{user_id}",
    response_model=List[PostResponse],
    summary="사용자가 공유한 게시글 목록",
    description="""
    특정 사용자가 공유한 게시글들을 조회합니다.
    - sort_by: 정렬 기준 (latest: 최신순, oldest: 오래된순, comments: 댓글 많은 순, likes: 공감 많은 순)
    - page: 페이지 번호
    - limit: 페이지당 게시글 수
    """
)
async def get_shared_posts(
    user_id: int,
    sort_by: SortOption = Query(SortOption.LATEST, description="정렬 기준"),
    page: int = Query(1, ge=1, description="페이지 번호"),
    limit: int = Query(10, ge=1, le=100, description="페이지당 게시글 수"),
    db: Session = Depends(get_db)
):
    # 좋아요 수를 계산하는 서브쿼리
    likes_count = (
        db.query(models.Like.post_id,
                func.count(models.Like.id).label('like_count'))
        .group_by(models.Like.post_id)
        .subquery()
    )

    # 댓글 수를 계산하는 서브쿼리
    comments_count = (
        db.query(models.Comment.post_id,
                func.count(models.Comment.comment_id).label('comment_count'))
        .group_by(models.Comment.post_id)
        .subquery()
    )

    # 메인 쿼리
    query = (
        db.query(
            models.Post,
            func.coalesce(likes_count.c.like_count, 0).label('like_count'),
            func.coalesce(comments_count.c.comment_count, 0).label('comment_count'),
        )
        .outerjoin(likes_count, models.Post.id == likes_count.c.post_id)
        .outerjoin(comments_count, models.Post.id == comments_count.c.post_id)
        .filter(
            models.Post.user_id == user_id,
            models.Post.is_shared == True
        )
    )

    # 정렬 적용
    if sort_by == SortOption.LATEST:
        query = query.order_by(desc(models.Post.created_at))
    elif sort_by == SortOption.OLDEST:
        query = query.order_by(asc(models.Post.created_at))
    elif sort_by == SortOption.COMMENTS:
        query = query.order_by(desc(func.coalesce(comments_count.c.comment_count, 0)))
    elif sort_by == SortOption.LIKES:
        query = query.order_by(desc(func.coalesce(likes_count.c.like_count, 0)))

    # 페이지네이션 적용
    offset = (page - 1) * limit
    results = query.offset(offset).limit(limit).all()

    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    
    # 결과를 PostResponse 형식으로 변환
    posts = []
    for post, like_count, comment_count in results:
        post_dict = {
            "id": post.id,
            "user_id": post.user_id,
            "emotion_type": post.emotion_type,
            "content": post.content,
            "ai_content": post.ai_content,
            "created_at": post.created_at,
            "is_shared": post.is_shared,
            "is_solved": post.is_solved,
            "like_count": like_count,
            "comment_count": comment_count,
            "user_info": {
                "nickname": user.nickname if user else "",
                "profile_image":user.profile_image if user else ""
            }
        }
        posts.append(post_dict)

    return posts

@router.get("/posts/liked/{user_id}",
    response_model=List[PostResponse],
    summary="사용자가 공감한 게시글 목록",
    description="""
    특정 사용자가 공감한 게시글들을 조회합니다.
    - sort_by: 정렬 기준 (latest: 최신순, oldest: 오래된순 comments: 댓글 많은 순, likes: 공감 많은 순)
    - page: 페이지 번호
    - limit: 페이지당 게시글 수
    """
)
async def get_liked_posts(
    user_id: int,
    sort_by: SortOption = Query(SortOption.LATEST, description="정렬 기준"),
    page: int = Query(1, ge=1, description="페이지 번호"),
    limit: int = Query(10, ge=1, le=100, description="페이지당 게시글 수"),
    db: Session = Depends(get_db)
):
    # 좋아요 수를 계산하는 서브쿼리
    likes_count = (
        db.query(models.Like.post_id,
                func.count(models.Like.id).label('like_count'))
        .group_by(models.Like.post_id)
        .subquery()
    )

    # 댓글 수를 계산하는 서브쿼리 
    comments_count = (
        db.query(models.Comment.post_id,
                func.count(models.Comment.comment_id).label('comment_count'))
        .group_by(models.Comment.post_id)
        .subquery()
    )

    # 메인 쿼리
    query = (
        db.query(
            models.Post,
            func.coalesce(likes_count.c.like_count, 0).label('like_count'),
            func.coalesce(comments_count.c.comment_count, 0).label('comment_count'),
            models.User.nickname,
            models.User.profile_image
        )
        .join(models.Like, models.Post.id == models.Like.post_id)
        .join(models.User, models.Post.user_id == models.User.user_id)  # user_id로 수정
        .outerjoin(likes_count, models.Post.id == likes_count.c.post_id)
        .outerjoin(comments_count, models.Post.id == comments_count.c.post_id)
        .filter(
            models.Like.user_id == user_id,
            models.Post.is_shared == True
        )
    )

    # 정렬 적용
    if sort_by == SortOption.LATEST:
        query = query.order_by(desc(models.Post.created_at))
    elif sort_by == SortOption.OLDEST:
        query = query.order_by(asc(models.Post.created_at))
    elif sort_by == SortOption.COMMENTS:
        query = query.order_by(desc(func.coalesce(comments_count.c.comment_count, 0)))
    elif sort_by == SortOption.LIKES:
        query = query.order_by(desc(func.coalesce(likes_count.c.like_count, 0)))

    # 페이지네이션 적용
    offset = (page - 1) * limit
    results = query.offset(offset).limit(limit).all()
    
    # 결과를 PostResponse 형식으로 변환
    posts = []
    for post, like_count, comment_count, nickname, profile_image in results:
        post_dict = {
            "id": post.id,
            "user_id": post.user_id,
            "emotion_type": post.emotion_type,
            "content": post.content,
            "ai_content": post.ai_content,
            "created_at": post.created_at,
            "is_shared": post.is_shared,
            "is_solved": post.is_solved,
            "like_count": like_count,
            "comment_count": comment_count,
            "user_info": {
                "nickname": nickname,
                "profile_image": profile_image
            }
        }
        posts.append(post_dict)

    return posts

# 프로필 수정
@router.patch(
    "/update/{user_id}",
    response_model=UserResponse,
    summary="프로필 정보 수정",
    description="""
    사용자의 프로필 정보를 수정합니다.
    
    **수정 가능한 항목:**
    - nickname: 닉네임 (2-20자)
    - password: 새 비밀번호 (최소 6자)
    
    **주의사항:**
    - 변경하지 않을 항목은 요청에서 제외 가능
    - 각 필드별 부분 수정 가능
    
    **사용 예시:**
    ```bash
    # 닉네임만 변경
    curl -X PATCH "http://api.example.com/profile/update/123" \\
         -H "Content-Type: application/json" \\
         -d '{"nickname": "새로운닉네임"}'
    
    # 비밀번호만 변경
    curl -X PATCH "http://api.example.com/profile/update/123" \\
         -H "Content-Type: application/json" \\
         -d '{"password": "newpassword123"}'
    ```
    """,
    responses={
        200: {
            "description": "프로필 수정 성공",
            "content": {
                "application/json": {
                    "example": {
                        "user_id": 1,
                        "id": "user123",
                        "nickname": "새로운닉네임",
                        "profile_image": "profile.jpg",
                        "created_at": "2024-03-21T12:00:00"
                    }
                }
            }
        },
        400: {
            "description": "잘못된 요청",
            "content": {
                "application/json": {
                    "example": {"detail": "닉네임이 중복되었습니다."}
                }
            }
        },
        401: {
            "description": "인증 실패",
            "content": {
                "application/json": {
                    "example": {"detail": "현재 비밀번호가 일치하지 않습니다."}
                }
            }
        },
        404: {
            "description": "사용자를 찾을 수 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "사용자를 찾을 수 없습니다."}
                }
            }
        },
        422: {
            "description": "유효성 검사 실패",
            "content": {
                "application/json": {
                    "example": {"detail": "닉네임은 2자 이상 20자 이하여야 합니다."}
                }
            }
        }
    }
)
async def update_profile(
    user_id: int,
    update_data: ProfileUpdate,
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="사용자를 찾을 수 없습니다."
        )
    
    # 현재 비밀번호 확인
    # if not SecurityUtils.verify_password(update_data.current_password, user.password):
    #     raise HTTPException(
    #         status_code=400,
    #         detail="현재 비밀번호가 일치하지 않습니다."
    #     )
    
    # 닉네임 업데이트
    if update_data.nickname:
        user.nickname = update_data.nickname
    
    # 비밀번호 업데이트
    if update_data.password:
        user.password = SecurityUtils.get_password_hash(update_data.password)
    
    try:
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="프로필 수정 중 오류가 발생했습니다."
        )

# 회원 탈퇴
@router.delete("/withdraw/{user_id}",
    response_model=MessageResponse,
    summary="회원 탈퇴",
    description="""
    회원 탈퇴를 진행합니다.
    - 사용자의 모든 데이터가 삭제됩니다.
    - 이 작업은 취소할 수 없습니다.
    """,
    responses={
        200: {
            "description": "탈퇴 성공",
            "content": {
                "application/json": {
                    "example": {"message": "회원 탈퇴가 완료되었습니다."}
                }
            }
        }
    }
)
async def withdraw_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="사용자를 찾을 수 없습니다."
        )
    
    try:
        # 사용자의 모든 데이터 삭제
        # 연관된 데이터(posts, comments, likes)는 cascade 설정에 따라 자동 삭제
        db.delete(user)
        db.commit()
        
        return MessageResponse(message="회원 탈퇴가 완료되었습니다.")
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="회원 탈퇴 처리 중 오류가 발생했습니다."
        )
    
class ImageResponse(BaseModel):
    id: str
    url: str

# 에러 응답 모델 정의
class ErrorResponse(BaseModel):
    detail: str

@router.put(
    "/{user_id}/profile-image",
    summary="프로필 이미지 업데이트",
    description="""
    사용자의 프로필 이미지를 업로드하고 업데이트합니다.
    
    **요청 형식:**
    - Multipart form data
    - 이미지 파일만 허용됨
    
    **처리 과정:**
    1. 이미지 파일 유효성 검증
    2. Cloudflare Images API를 통한 이미지 업로드
    3. 업로드된 이미지 URL을 사용자 프로필에 저장
    
    **제약사항:**
    - 이미지 파일 형식만 허용 (image/*)
    - 파일 크기 제한: 10MB
    """,
    responses={
        200: {
            "description": "이미지 업로드 성공",
            "content": {
                "application/json": {
                    "example": {
                        "message": "Profile image updated successfully",
                        "profile_image_url": "https://imagedelivery.net/xxx/yyy/public"
                    }
                }
            }
        },
        400: {
            "description": "잘못된 요청",
            "content": {
                "application/json": {
                    "example": {"detail": "File must be an image"}
                }
            }
        },
        404: {
            "description": "사용자를 찾을 수 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "User not found"}
                }
            }
        },
        500: {
            "description": "서버 오류",
            "content": {
                "application/json": {
                    "example": {"detail": "Internal server error"}
                }
            }
        }
    }
)
async def update_profile_image(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        # 이미지 파일 검증
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")

        # 파일 읽기
        contents = await file.read()

        # Cloudflare API 엔드포인트
        url = f"https://api.cloudflare.com/client/v4/accounts/{os.getenv('CF_ACCOUNT_ID')}/images/v1"
        
        # 파일 데이터 준비
        form_data = aiohttp.FormData()
        form_data.add_field('file', 
                          contents,
                          filename=file.filename,
                          content_type=file.content_type)

        headers = {
            "Authorization": f"Bearer {os.getenv('CF_API_TOKEN')}"
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(url, data=form_data, headers=headers) as response:
                result = await response.json()
                
                if not result.get("success"):
                    raise HTTPException(
                        status_code=400, 
                        detail=str(result.get("errors", ["Unknown error"])[0])
                    )
                
                # 이미지 URL 생성
                image_id = result["result"]["id"]
                image_url = f"https://imagedelivery.net/{os.getenv('CF_ACCOUNT_HASH')}/{image_id}/public"
                
                # DB 업데이트
                user.profile_image = image_url
                db.commit()
                
                return {
                    "message": "Profile image updated successfully",
                    "profile_image_url": image_url
                }
    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        await file.seek(0)

@router.get(
    "/{user_id}",
    response_model=UserResponse,
    summary="사용자 프로필 조회",
    description="""
    특정 사용자의 프로필 정보를 조회합니다.
    
    **반환 정보:**
    - user_id: 사용자 고유 ID
    - id: 사용자 로그인 ID
    - nickname: 닉네임
    - profile_image: 프로필 이미지 URL
    - created_at: 계정 생성일
    """,
    responses={
        200: {
            "description": "프로필 조회 성공",
            "content": {
                "application/json": {
                    "example": {
                        "user_id": 1,
                        "id": "user123",
                        "nickname": "사용자닉네임",
                        "profile_image": "https://imagedelivery.net/xxx/yyy/public",
                        "created_at": "2024-03-21T12:00:00"
                    }
                }
            }
        },
        404: {
            "description": "사용자를 찾을 수 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "사용자를 찾을 수 없습니다."}
                }
            }
        }
    }
)
async def get_user_profile(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="사용자를 찾을 수 없습니다."
        )
    
    return user
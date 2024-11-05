from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import extract
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from database import get_db
from model import models
from model.schemas import PostResponse, S_PostResponse

router = APIRouter(prefix="/diary", tags=["Diary"])

class PostFilter(BaseModel):
    user_id: int
    year: Optional[int] = None
    month: Optional[int] = None
    is_shared: Optional[bool] = None

    class Config:
        schema_extra = {
            "example": {
                "user_id": 1,
                "year": 2024,
                "month": 3,
                "is_shared": True
            }
        }

@router.get(
    "/posts",
    response_model=List[S_PostResponse],
    summary="사용자의 월별 걱정거리 조회"
)
def get_monthly_posts(
    user_id: int,
    year: Optional[int] = None,
    month: Optional[int] = None,
    is_shared: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Post).filter(models.Post.user_id == user_id)
    
    if year is not None and month is not None:
        query = query.filter(
            extract('year', models.Post.created_at) == year,
            extract('month', models.Post.created_at) == month
        )
    
    if is_shared is not None:
        query = query.filter(models.Post.is_shared == is_shared)
    
    posts = query.order_by(models.Post.created_at.desc()).all()
    return posts

@router.get("/post/{post_id}",
    response_model=S_PostResponse,
    summary="특정 걱정거리 상세 조회",
    description="특정 게시글의 상세 내용과 AI 답변을 조회합니다.",
    response_description="걱정거리 상세 정보"
)
def get_post_detail(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=404, 
            detail="게시글을 찾을 수 없습니다."
        )
    return post

class VisibilityUpdate(BaseModel):
    user_id: int

    class Config:
        schema_extra = {
            "example": {
                "user_id": 1
            }
        }

@router.patch(
    "/post/{post_id}/visibility",
    response_model=S_PostResponse,
    summary="게시글 공개 상태 변경",
    description="""
        게시글의 공개/비공개 상태를 토글합니다.
        
        **권한 검증:**
        - user_id: 게시글 작성자 ID (필수)
        
        **상태 변경 동작:**
        1. 공개(true) → 비공개(false)
        - 커뮤니티에서 게시글 숨김
        - 기존 댓글/좋아요는 유지되나 접근 제한
        - 검색 결과에서 제외
        
        2. 비공개(false) → 공개(true)
        - 커뮤니티에 게시글 노출
        - 댓글/좋아요 기능 활성화
        - 검색 결과에 포함
        
        **제약사항:**
        1. 본인 게시글만 상태 변경 가능
        2. 삭제된 게시글은 변경 불가
        3. 신고로 인해 관리자가 숨김 처리한 게시글은 변경 불가
        
        **사용 예시:**
        ```bash
        curl -X PATCH "http://api.example.com/diary/post/123/visibility" \\
            -H "Content-Type: application/json" \\
            -d '{"user_id": 1}'
        ```
        
        **주의사항:**
        1. 공개 설정 시 모든 사용자가 접근 가능
        2. 비공개 설정 시에도 기존 통계는 유지
        3. 상태 변경 시 알림 설정된 사용자에게 알림 발송
    """,
    responses={
        200: {
            "description": "상태 변경 성공",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "user_id": 1,
                        "emotion_type": "ANXIETY",
                        "content": "발표가 걱정됩니다.",
                        "ai_content": "발표에 대한 걱정...",
                        "created_at": "2024-03-21T12:00:00",
                        "is_shared": False,
                        "is_solved": False
                    }
                }
            }
        },
        403: {
            "description": "권한 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "게시글을 수정할 권한이 없습니다."}
                }
            }
        },
        404: {
            "description": "게시글 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "게시글을 찾을 수 없습니다."}
                }
            }
        }
    }
)
def toggle_post_visibility(
    post_id: int,
    update_data: VisibilityUpdate,
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(
        models.Post.id == post_id,
        models.Post.user_id == update_data.user_id
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=404, 
            detail="게시글을 찾을 수 없거나 수정 권한이 없습니다."
        )
    
    post.is_shared = not post.is_shared
    db.commit()
    db.refresh(post)
    return post

class SolutionUpdate(BaseModel):
    user_id: int

    class Config:
        schema_extra = {
            "example": {
                "user_id": 1
            }
        }

@router.patch(
    "/post/{post_id}/solve",
    response_model=S_PostResponse,
    summary="걱정거리 해결 상태 변경",
    description="""
    걱정거리의 해결/미해결 상태를 토글합니다.
    
    **권한 검증:**
    - user_id: 게시글 작성자 ID (필수)
    
    **상태 변경 동작:**
    1. 미해결 → 해결
       - is_solved = true
       - 해결 일시 기록
       - 통계에 반영
    
    2. 해결 → 미해결
       - is_solved = false
       - 해결 일시 제거
       - 통계 업데이트
    
    **해결 상태 변경의 영향:**
    1. 사용자 통계
       - 해결된 걱정거리 수 업데이트
       - 해결률 계산에 반영
    
    2. 게시글 표시
       - 해결된 게시글 특별 표시
       - 정렬 순서 영향
    
    **사용 예시:**
    ```bash
    curl -X PATCH "http://api.example.com/diary/post/123/solve" \\
         -H "Content-Type: application/json" \\
         -d '{"user_id": 1}'
    ```
    
    **활용 시나리오:**
    1. 걱정거리 관리
       - 해결된 걱정 분류
       - 미해결 걱정 추적
    
    2. 성취 분석
       - 월별 해결률 확인
       - 카테고리별 해결 패턴 분석
    
    **주의사항:**
    1. 상태 변경은 작성자만 가능
    2. 해결 상태는 언제든지 변경 가능
    3. 삭제된 게시글은 상태 변경 불가
    """,
    responses={
        200: {
            "description": "상태 변경 성공",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "user_id": 1,
                        "emotion_type": "ANXIETY",
                        "content": "발표가 걱정됩니다.",
                        "ai_content": "발표에 대한 걱정...",
                        "created_at": "2024-03-21T12:00:00",
                        "is_shared": True,
                        "is_solved": True
                    }
                }
            }
        },
        403: {
            "description": "권한 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "게시글을 수정할 권한이 없습니다."}
                }
            }
        },
        404: {
            "description": "게시글 없음",
            "content": {
                "application/json": {
                    "example": {"detail": "게시글을 찾을 수 없습니다."}
                }
            }
        }
    }
)
def toggle_post_solution(
    post_id: int,
    update_data: SolutionUpdate,
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(
        models.Post.id == post_id,
        models.Post.user_id == update_data.user_id
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=404, 
            detail="게시글을 찾을 수 없거나 수정 권한이 없습니다."
        )
    
    post.is_solved = not post.is_solved
    db.commit()
    db.refresh(post)
    return post
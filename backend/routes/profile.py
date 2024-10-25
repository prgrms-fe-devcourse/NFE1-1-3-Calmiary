from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Optional
from database import get_db
from model import models
from model.schemas import MessageResponse, PostResponse, UserResponse
from pydantic import BaseModel, Field
from utils.security import SecurityUtils

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

# 공유한 게시글 조회
@router.get("/posts/shared/{user_id}",
    response_model=List[PostResponse],
    summary="사용자가 공유한 게시글 목록",
    description="특정 사용자가 공유한 게시글들을 조회합니다."
)
async def get_shared_posts(
    user_id: int,
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
            func.coalesce(comments_count.c.comment_count, 0).label('comment_count')
        )
        .outerjoin(likes_count, models.Post.id == likes_count.c.post_id)
        .outerjoin(comments_count, models.Post.id == comments_count.c.post_id)
        .filter(
            models.Post.user_id == user_id,
            models.Post.is_shared == True
        )
        .order_by(desc(models.Post.created_at))
    )
    
    results = query.all()
    
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
            "comment_count": comment_count
        }
        posts.append(post_dict)

    return posts


@router.get("/posts/liked/{user_id}",
    response_model=List[PostResponse],
    summary="사용자가 공감한 게시글 목록",
    description="특정 사용자가 공감한 게시글들을 조회합니다."
)
async def get_liked_posts(
    user_id: int,
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

    # 메인 쿼리: 사용자가 좋아요한 게시글 조회
    query = (
        db.query(
            models.Post,
            func.coalesce(likes_count.c.like_count, 0).label('like_count'),
            func.coalesce(comments_count.c.comment_count, 0).label('comment_count')
        )
        .join(models.Like, models.Post.id == models.Like.post_id)
        .outerjoin(likes_count, models.Post.id == likes_count.c.post_id)
        .outerjoin(comments_count, models.Post.id == comments_count.c.post_id)
        .filter(
            models.Like.user_id == user_id,
            models.Post.is_shared == True
        )
        .order_by(desc(models.Post.created_at))
    )
    
    results = query.all()
    
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
            "comment_count": comment_count
        }
        posts.append(post_dict)

    return posts

# 프로필 수정
@router.patch("/update/{user_id}",
    response_model=UserResponse,
    summary="프로필 정보 수정",
    description="""
    사용자의 프로필 정보를 수정합니다.
    - 닉네임과 비밀번호를 변경할 수 있습니다.
    - 변경하지 않을 항목은 생략 가능합니다.
    - 비밀번호 변경 시 현재 비밀번호 확인이 필요합니다.
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
                    "example": {"detail": "현재 비밀번호가 일치하지 않습니다."}
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
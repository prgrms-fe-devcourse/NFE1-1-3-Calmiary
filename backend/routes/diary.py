from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import extract
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from database import get_db
from model import models
from model.schemas import PostResponse

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

@router.post("/posts", 
    response_model=List[PostResponse],
    summary="월별 걱정거리 조회",
    description="""
    특정 사용자의 월별 걱정거리를 조회합니다.
    Request body에서:
    - year와 month로 특정 월의 게시글을 필터링할 수 있습니다.
    - is_shared로 공개/비공개 게시글을 필터링할 수 있습니다.
    """,
    response_description="필터링된 걱정거리 목록"
)
def get_monthly_posts(
    filter_data: PostFilter,
    db: Session = Depends(get_db)
):
    query = db.query(models.Post).filter(models.Post.user_id == filter_data.user_id)
    
    if filter_data.year is not None and filter_data.month is not None:
        query = query.filter(
            extract('year', models.Post.created_at) == filter_data.year,
            extract('month', models.Post.created_at) == filter_data.month
        )
    
    if filter_data.is_shared is not None:
        query = query.filter(models.Post.is_shared == filter_data.is_shared)
    
    posts = query.order_by(models.Post.created_at.desc()).all()
    return posts

@router.get("/post/{post_id}",
    response_model=PostResponse,
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

@router.patch("/post/{post_id}/visibility",
    response_model=PostResponse,
    summary="게시글 공개 여부 변경",
    description="""
    게시글의 공개/비공개 상태를 토글합니다.
    권한 확인을 위해 사용자 ID가 필요합니다.
    """,
    response_description="업데이트된 게시글 정보"
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

@router.patch("/post/{post_id}/solve",
    response_model=PostResponse,
    summary="걱정거리 해결 상태 변경",
    description="""
    걱정거리의 해결/미해결 상태를 토글합니다.
    권한 확인을 위해 사용자 ID가 필요합니다.
    """,
    response_description="업데이트된 게시글 정보"
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
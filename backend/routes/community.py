from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, select
from typing import List, Optional
from pydantic import BaseModel, Field
from database import get_db
from model import models
from model.schemas import PostResponse, CommentResponse, LikeResponse
from enum import Enum

router = APIRouter(prefix="/community", tags=["Community"])

class SortOption(str, Enum):
    LATEST = "latest"
    COMMENTS = "comments"
    LIKES = "likes"

class SharedPostsFilter(BaseModel):
    sort_by: Optional[SortOption] = SortOption.LATEST
    page: int = 1
    limit: int = 10

    class Config:
        json_schema_extra = {
            "example": {
                "sort_by": "likes",
                "page": 1,
                "limit": 10
            }
        }

class CommentResponse(BaseModel):
    comment_id: int
    user_id: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class PostDetailResponse(BaseModel):
    id: int
    user_id: int
    emotion_type: str
    content: str
    ai_content: str
    created_at: datetime
    is_shared: bool
    is_solved: bool
    like_count: int = Field(default=0, description="게시글의 좋아요 수")
    comment_count: int = Field(default=0, description="게시글의 댓글 수")
    comments: List[CommentResponse] = Field(default=[], description="게시글의 댓글 목록")

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class PostResponse(BaseModel):
    id: int
    user_id: int
    emotion_type: str
    content: str
    ai_content: str
    created_at: datetime
    is_shared: bool
    is_solved: bool
    like_count: int = Field(default=0)
    comment_count: int = Field(default=0)

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class SharedPostsFilter(BaseModel):
    sort_by: Optional[str] = Field(default="latest")
    page: int = Field(default=1, ge=1)
    limit: int = Field(default=10, ge=1, le=100)

    class Config:
        arbitrary_types_allowed = True

class CommentCreate(BaseModel):
    user_id: int
    content: str

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": 1,
                "content": "힘내세요! 저도 비슷한 경험이 있어요."
            }
        }
        arbitrary_types_allowed = True

class LikeResponse(BaseModel):
    id: Optional[int] = None
    user_id: int
    post_id: int
    created_at: Optional[datetime] = None
    is_canceled: bool = False
    message: str

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

@router.post("/posts", 
    response_model=List[PostResponse],
    summary="공유된 걱정거리 목록 조회",
    description="""
    공유된 걱정거리 목록을 조회합니다.
    - sort_by: 정렬 기준 (latest: 최신순, comments: 댓글 많은 순, likes: 공감 많은 순)
    - page: 페이지 번호
    - limit: 페이지당 게시글 수
    """
)
def get_shared_posts(
    filter_data: SharedPostsFilter,
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
        .filter(models.Post.is_shared == True)
    )

    # 정렬 적용
    if filter_data.sort_by == SortOption.LATEST:
        query = query.order_by(desc(models.Post.created_at))
    elif filter_data.sort_by == SortOption.COMMENTS:
        query = query.order_by(desc(func.coalesce(comments_count.c.comment_count, 0)))
    elif filter_data.sort_by == SortOption.LIKES:
        query = query.order_by(desc(func.coalesce(likes_count.c.like_count, 0)))

    # 페이지네이션 적용
    offset = (filter_data.page - 1) * filter_data.limit
    results = query.offset(offset).limit(filter_data.limit).all()

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


@router.get("/post/{post_id}",
    response_model=PostDetailResponse,
    summary="게시글 상세 조회",
    description="""
    게시글의 상세 정보를 조회합니다.
    - 게시글 내용
    - 좋아요 수
    - 댓글 수
    - 댓글 목록
    이 포함됩니다.
    """
)
def get_post_detail(
    post_id: int,
    db: Session = Depends(get_db)
):
    # 게시글 조회와 함께 좋아요, 댓글 수를 계산
    result = (
        db.query(
            models.Post,
            func.count(models.Like.id).label('like_count'),
            func.count(models.Comment.comment_id).label('comment_count')
        )
        .outerjoin(models.Like, models.Post.id == models.Like.post_id)
        .outerjoin(models.Comment, models.Post.id == models.Comment.post_id)
        .filter(models.Post.id == post_id)
        .group_by(models.Post.id)
        .first()
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="게시글을 찾을 수 없습니다."
        )

    post, like_count, comment_count = result

    if not post.is_shared:
        raise HTTPException(
            status_code=404,
            detail="비공개 게시글입니다."
        )

    # 댓글 목록 조회
    comments = (
        db.query(models.Comment)
        .filter(models.Comment.post_id == post_id)
        .order_by(models.Comment.created_at.desc())
        .all()
    )

    # 응답 데이터 구성
    return {
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
        "comments": comments
    }

@router.post("/post/{post_id}/like",
    response_model=LikeResponse,
    summary="게시글 공감",
    description="""
    게시글에 공감을 표시하거나 취소합니다.
    이미 공감한 경우 공감이 취소되고, 공감하지 않은 경우 공감이 추가됩니다.
    """
)
def toggle_like(
    post_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):
    # 공개된 게시글인지 확인
    post = db.query(models.Post).filter(
        models.Post.id == post_id,
        models.Post.is_shared == True
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=404,
            detail="게시글을 찾을 수 없거나 비공개 게시글입니다."
        )
    
    try:
        # 기존 공감 확인
        existing_like = db.query(models.Like).filter(
            models.Like.user_id == user_id,
            models.Like.post_id == post_id
        ).first()
        
        if existing_like:
            # 공감 취소
            db.delete(existing_like)
            db.commit()
            return LikeResponse(
                user_id=user_id,
                post_id=post_id,
                is_canceled=True,
                message="공감이 취소되었습니다."
            )
        else:
            # 새로운 공감 추가
            new_like = models.Like(
                user_id=user_id,
                post_id=post_id
            )
            db.add(new_like)
            db.commit()
            db.refresh(new_like)
            return LikeResponse(
                id=new_like.id,
                user_id=new_like.user_id,
                post_id=new_like.post_id,
                created_at=new_like.created_at,
                is_canceled=False,
                message="공감을 표시했습니다."
            )
            
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="공감 처리 중 오류가 발생했습니다."
        )
    
@router.post("/post/{post_id}/comment",
    response_model=CommentResponse,
    summary="댓글 작성",
    description="""
    게시글에 새로운 댓글을 작성합니다.
    - 비공개 게시글에는 댓글을 작성할 수 없습니다.
    - 댓글 내용은 1자 이상 500자 이하여야 합니다.
    """,
    responses={
        201: {
            "description": "댓글이 성공적으로 생성됨",
            "content": {
                "application/json": {
                    "example": {
                        "comment_id": 1,
                        "user_id": 1,
                        "post_id": 1,
                        "content": "힘내세요! 저도 비슷한 경험이 있어요.",
                        "created_at": "2024-03-21T12:00:00"
                    }
                }
            }
        },
        404: {
            "description": "게시글을 찾을 수 없거나 비공개 게시글",
            "content": {
                "application/json": {
                    "example": {"detail": "게시글을 찾을 수 없거나 비공개 게시글입니다."}
                }
            }
        },
        422: {
            "description": "입력값 검증 실패",
            "content": {
                "application/json": {
                    "example": {"detail": "댓글 내용은 필수입니다."}
                }
            }
        }
    }
)
async def create_comment(
    post_id: int,
    comment_data: CommentCreate,
    db: Session = Depends(get_db)
):
    # 게시글 존재 여부와 공개 여부 확인
    post = db.query(models.Post).filter(
        models.Post.id == post_id,
        models.Post.is_shared == True
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=404,
            detail="게시글을 찾을 수 없거나 비공개 게시글입니다."
        )
    
    try:
        # 댓글 생성
        new_comment = models.Comment(
            user_id=comment_data.user_id,
            post_id=post_id,
            content=comment_data.content
        )
        
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)
        
        return new_comment
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="댓글 작성 중 오류가 발생했습니다."
        )

# 게시글 상세 조회에서 댓글을 가져오는 부분의 쿼리도 최적화
def get_comments_for_post(db: Session, post_id: int):
    """게시글의 댓글 목록을 조회하는 헬퍼 함수"""
    return (
        db.query(models.Comment)
        .filter(models.Comment.post_id == post_id)
        .order_by(models.Comment.created_at.desc())
        .all()
    )
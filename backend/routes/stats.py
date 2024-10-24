from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from database import get_db
from model import models
from datetime import datetime, timedelta
from pydantic import BaseModel

router = APIRouter(
    prefix="/stats",
    tags=["Statistics"],
)

class PostStats(BaseModel):
    this_week_posts: int
    total_posts: int
    resolved_posts: int

    class Config:
        json_schema_extra = {
            "example": {
                "this_week_posts": 5,
                "total_posts": 42,
                "resolved_posts": 12
            }
        }

@router.get(
    "/posts/{user_id}",
    response_model=PostStats,
    summary="사용자의 게시물 통계 조회",
    description="""
    특정 사용자의 게시물 통계를 조회합니다:
    
    - this_week_posts: 이번 주에 작성한 걱정 게시물 수
    - total_posts: 전체 걱정 게시물 수
    - resolved_posts: 해결된 걱정 게시물 수 (is_solved가 True인 게시물)
    """,
    responses={
        200: {
            "description": "통계 조회 성공",
            "content": {
                "application/json": {
                    "example": {
                        "this_week_posts": 5,
                        "total_posts": 42,
                        "resolved_posts": 12
                    }
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
        }
    }
)
async def get_post_stats(user_id: int, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 이번 주의 시작일 계산 (월요일 기준)
    today = datetime.now()
    monday = today - timedelta(days=today.weekday())
    monday = monday.replace(hour=0, minute=0, second=0, microsecond=0)


    this_week_posts = db.query(models.Post).filter(
        and_(
            models.Post.user_id == user_id,
            models.Post.created_at >= monday
        )
    ).count()

    total_posts = db.query(models.Post).filter(
        models.Post.user_id == user_id
    ).count()

    resolved_posts = db.query(models.Post).filter(
        and_(
            models.Post.user_id == user_id,
            models.Post.is_solved == True
        )
    ).count()

    return {
        "this_week_posts": this_week_posts,
        "total_posts": total_posts,
        "resolved_posts": resolved_posts
    }

@router.get(
    "/overview",
    response_model=dict,
    summary="전체 통계 조회",
    description="시스템 전체의 통계 정보를 조회합니다.",
    responses={
        200: {
            "description": "통계 조회 성공",
            "content": {
                "application/json": {
                    "example": {
                        "total_users": 100,
                        "total_posts": 500,
                        "resolved_posts": 200,
                        "resolution_rate": 40.0
                    }
                }
            }
        }
    }
)
async def get_overall_stats(db: Session = Depends(get_db)):
    total_users = db.query(models.User).count()
    total_posts = db.query(models.Post).count()
    resolved_posts = db.query(models.Post).filter(models.Post.field6 == True).count()
    
    resolution_rate = (resolved_posts / total_posts * 100) if total_posts > 0 else 0

    return {
        "total_users": total_users,
        "total_posts": total_posts,
        "resolved_posts": resolved_posts,
        "resolution_rate": round(resolution_rate, 2)
    }
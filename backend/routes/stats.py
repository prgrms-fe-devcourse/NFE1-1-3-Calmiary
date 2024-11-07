from typing import Tuple
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
    growth_stage: int
    growth_message: str

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
    특정 사용자의 게시물 관련 통계 정보를 조회합니다.
    
    **제공되는 통계 정보:**
    1. 이번 주 작성 게시물 (this_week_posts)
       - 이번 주 월요일 00:00:00부터 현재까지 작성된 게시물 수
       - 주의 시작은 월요일 기준
    
    2. 전체 게시물 (total_posts)
       - 사용자가 작성한 모든 게시물의 총 개수
       - 공개/비공개 모두 포함
    
    3. 해결된 게시물 (resolved_posts)
       - is_solved가 true인 게시물의 수
       - 해결된 걱정거리의 총 개수
    
    **통계 기준:**
    - 시간 기준: 서버 시간 기준
    - 주간 집계: 월요일 00:00:00 ~ 현재
    - 전체 집계: 가입일부터 현재까지
    
    **사용 예시:**
    ```bash
    # 특정 사용자의 통계 조회
    curl "http://api.example.com/stats/posts/123"
    ```
    
    **참고사항:**
    1. 통계는 실시간으로 계산됩니다.
    2. 삭제된 게시물은 통계에서 제외됩니다.
    3. 비공개 게시물도 통계에 포함됩니다.
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

    growth_stage, growth_message = calculate_growth_stage(resolved_posts, total_posts)

    return {
        "this_week_posts": this_week_posts,
        "total_posts": total_posts,
        "resolved_posts": resolved_posts,
        "growth_stage": growth_stage,
        "growth_message": growth_message
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


def calculate_growth_stage(resolved_posts: int, total_posts: int) -> Tuple[int, str]:
    """
    해결된 고민의 개수와 비율을 모두 고려하여 성장 단계와 메시지를 반환
    """
    if total_posts == 0:
        return 1, "첫 걸음을 시작해보세요!"
    
    resolution_rate = (resolved_posts / total_posts) * 100
    
    # 개수와 비율을 모두 고려
    if resolved_posts < 3:
        return 1, "천천히 시작해보세요!"
    elif resolved_posts < 10 or resolution_rate < 20:
        return 2, f"벌써 {resolved_posts}개의 고민을 해결했어요!"
    elif resolved_posts < 20 or resolution_rate < 40:
        return 3, f"{resolved_posts}개의 고민을 해결했어요. 잘 하고 있어요!"
    elif resolved_posts < 40 or resolution_rate < 60:
        return 4, f"무려 {resolved_posts}개의 고민을 극복했어요! ({resolution_rate:.1f}%)"
    else:
        return 5, f"당신은 이미 강해졌어요! ({resolution_rate:.1f}%의 해결률)"
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class UserResponse(BaseModel):
    user_id: int
    id: str
    nickname: str
    profile_image: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class PostResponse(BaseModel):
    id: int
    user_id: int
    emotion_type: str
    content: str
    ai_content: str
    created_at: datetime
    field5: bool
    field6: bool

    class Config:
        from_attributes = True

class CommentResponse(BaseModel):
    comment_id: int
    user_id: int
    post_id: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

class LikeResponse(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Request Models
class UserCreate(BaseModel):
    id: str = Field(..., example="user123", description="사용자 아이디")
    nickname: str = Field(..., example="홍길동", description="사용자 닉네임")
    password: str = Field(..., example="$afnfo16m4", description="(hash) 사용자 비밀번호")
    profile_image: Optional[str] = Field(None, example="profile.jpg", description="프로필 이미지 URL")

class PostCreate(BaseModel):
    user_id: int = Field(..., example=1, description="작성자 ID")
    emotion_type: str = Field(..., example="sad", description="감정 타입 (happy, sad, angry 등)")
    content: str = Field(..., example="오늘 시험을 못봤어요", description="걱정거리 내용")

    class Config:
        schema_extra = {
            "example": {
                "user_id": 1,
                "emotion_type": "sad",
                "content": "오늘 시험을 못봤어요"
            }
        }

class CommentCreate(BaseModel):
    user_id: int = Field(..., example=1, description="댓글 작성자 ID")
    post_id: int = Field(..., example=1, description="댓글을 달 포스트 ID")
    content: str = Field(..., example="힘내세요!", description="댓글 내용")

    class Config:
        schema_extra = {
            "example": {
                "user_id": 1,
                "post_id": 1,
                "content": "힘내세요! 다음에는 더 잘하실 거예요."
            }
        }

# Like Request Models
class LikeCreate(BaseModel):
    user_id: int = Field(..., example=1, description="좋아요를 누른 사용자 ID")
    post_id: int = Field(..., example=1, description="좋아요를 받은 포스트 ID")

    class Config:
        schema_extra = {
            "example": {
                "user_id": 1,
                "post_id": 1
            }
        }
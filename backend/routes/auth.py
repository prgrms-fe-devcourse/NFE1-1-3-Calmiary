from fastapi import APIRouter, Depends, HTTPException, status, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from model import models
from sqlalchemy.orm import Session
from utils.security import SecurityUtils
from utils.token_manager import token_manager
from database import get_db

router = APIRouter(
    prefix="/auth", 
    tags=["Authentication"],
)
security = HTTPBearer()

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                "token_type": "bearer"
            }
        }

class UserLogin(BaseModel):
    id: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": "test123",
                "password": "password123"
            }
        }

@router.post(
    "/login", 
    response_model=Token,
    summary="사용자 로그인",
    description="""
    사용자 ID와 비밀번호를 사용하여 로그인합니다.
    성공 시 액세스 토큰과 리프레시 토큰이 발급됩니다.
    
    **참고사항:**
    - 액세스 토큰의 유효기간은 60분입니다.
    - 리프레시 토큰의 유효기간은 7일입니다.
    - 이전에 발급된 토큰은 자동으로 무효화됩니다.
    """,
    responses={
        200: {
            "description": "로그인 성공",
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                        "token_type": "bearer"
                    }
                }
            }
        },
        401: {
            "description": "인증 실패",
            "content": {
                "application/json": {
                    "example": {"detail": "아이디 또는 비밀번호가 올바르지 않습니다."}
                }
            }
        }
    }
)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    # 사용자 확인
    user = db.query(models.User).filter(models.User.id == user_data.id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="아이디 또는 비밀번호가 올바르지 않습니다."
        )
    
    # 비밀번호 검증
    if not SecurityUtils.verify_password(user_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="아이디 또는 비밀번호가 올바르지 않습니다."
        )
    
    # 기존 토큰 무효화
    token_manager.revoke_tokens(user.user_id)
    
    # 새 토큰 생성
    access_token = SecurityUtils.create_access_token(
        data={"sub": user.id, "user_id": user.user_id}
    )
    refresh_token = SecurityUtils.create_refresh_token(
        data={"sub": user.id, "user_id": user.user_id}
    )
    
    # 토큰 저장
    token_manager.store_tokens(
        user.user_id,
        access_token,
        refresh_token
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post(
    "/refresh", 
    response_model=Token,
    summary="토큰 갱신",
    description="""
    리프레시 토큰을 사용하여 새로운 액세스 토큰과 리프레시 토큰을 발급받습니다.
    
    **헤더 설정:**
    - Authorization: Bearer {refresh_token}
    
    **주의사항:**
    - 반드시 리프레시 토큰을 사용해야 합니다.
    - 액세스 토큰으로는 갱신할 수 없습니다.
    - 이전 토큰은 자동으로 무효화됩니다.
    """,
    responses={
        200: {
            "description": "토큰 갱신 성공",
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                        "token_type": "bearer"
                    }
                }
            }
        },
        401: {
            "description": "인증 실패",
            "content": {
                "application/json": {
                    "example": {"detail": "Could not validate credentials"}
                }
            }
        }
    }
)
async def refresh_token(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db)
):
    try:
        # 토큰 검증
        token = credentials.credentials
        user_id = token_manager.validate_token(token, "refresh")
        
        user = db.query(models.User).filter(models.User.user_id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        # 새 토큰 발급
        access_token = SecurityUtils.create_access_token(
            data={"sub": user.id, "user_id": user.user_id}
        )
        refresh_token = SecurityUtils.create_refresh_token(
            data={"sub": user.id, "user_id": user.user_id}
        )
        
        # 토큰 저장
        token_manager.store_tokens(
            user.user_id,
            access_token,
            refresh_token
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

@router.post(
    "/logout",
    summary="로그아웃",
    description="""
    현재 사용자의 모든 토큰을 무효화하고 로그아웃 처리합니다.
    
    **헤더 설정:**
    - Authorization: Bearer {access_token}
    
    **주의사항:**
    - 액세스 토큰이 필요합니다.
    - 로그아웃 시 해당 사용자의 모든 토큰(액세스, 리프레시)이 무효화됩니다.
    """,
    responses={
        200: {
            "description": "로그아웃 성공",
            "content": {
                "application/json": {
                    "example": {"message": "Successfully logged out"}
                }
            }
        },
        401: {
            "description": "인증 실패",
            "content": {
                "application/json": {
                    "example": {"detail": "Could not validate credentials"}
                }
            }
        }
    }
)
async def logout(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        # 토큰으로 사용자 식별
        token = credentials.credentials
        user_id = token_manager.validate_token(token)
        
        # 토큰 무효화
        token_manager.revoke_tokens(user_id)
        
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
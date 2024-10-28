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
    사용자 ID와 비밀번호를 사용하여 로그인을 진행합니다.
    
    **입력 파라미터:**
    - id: 사용자 아이디 (필수)
    - password: 비밀번호 (필수)
    
    **응답:**
    - access_token: 60분 동안 유효한 액세스 토큰
    - refresh_token: 7일 동안 유효한 리프레시 토큰
    - token_type: 토큰 타입 (bearer)
    
    **주의사항:**
    1. 이전에 발급된 토큰은 자동으로 무효화됩니다.
    2. 비밀번호는 암호화되어 저장/검증됩니다.
    3. 로그인 실패 시 보안을 위해 구체적인 실패 원인을 제공하지 않습니다.
    
    **사용 예시:**
    ```bash
    curl -X POST "https://calmiary-be.org/auth/login" \\
         -H "Content-Type: application/json" \\
         -d '{"id": "user123", "password": "password123"}'
    ```
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
        },
        422: {
            "description": "유효하지 않은 입력",
            "content": {
                "application/json": {
                    "example": {"detail": "아이디와 비밀번호는 필수 입력값입니다."}
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
    summary="액세스 토큰 갱신",
    description="""
    리프레시 토큰을 사용하여 새로운 액세스 토큰과 리프레시 토큰을 발급받습니다.
    
    **요청 헤더 설정:**
    - Authorization: Bearer {refresh_token}
    
    **응답 데이터:**
    - access_token: 새로 발급된 액세스 토큰 (60분 유효)
    - refresh_token: 새로 발급된 리프레시 토큰 (7일 유효)
    - token_type: 토큰 타입 (bearer)
    
    **토큰 갱신 규칙:**
    1. 반드시 유효한 리프레시 토큰으로 요청
    2. 액세스 토큰으로는 갱신 불가
    3. 이전 토큰들은 자동 무효화
    4. 리프레시 토큰도 만료된 경우 재로그인 필요
    
    **사용 예시:**
    ```bash
    curl -X POST "http://api.example.com/auth/refresh" \\
         -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    ```
    
    **보안 주의사항:**
    1. 리프레시 토큰은 안전하게 보관
    2. 탈취 의심 시 즉시 로그아웃 처리
    3. 여러 디바이스에서 동시 사용 불가
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
                    "example": {"detail": "Invalid or expired refresh token"}
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
    
    **요청 헤더 설정:**
    - Authorization: Bearer {access_token}
    
    **로그아웃 처리 내용:**
    1. 현재 사용자의 모든 액세스 토큰 무효화
    2. 현재 사용자의 모든 리프레시 토큰 무효화
    3. 토큰 저장소에서 사용자 관련 데이터 제거
    
    **주의사항:**
    1. 반드시 유효한 액세스 토큰 필요
    2. 로그아웃 후 해당 토큰으로는 더 이상 API 호출 불가
    3. 다른 디바이스의 토큰도 모두 무효화
    
    **사용 예시:**
    ```bash
    curl -X POST "http://api.example.com/auth/logout" \\
         -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    ```
    
    **권장사항:**
    1. 앱/웹 종료 전 반드시 로그아웃 처리
    2. 클라이언트에 저장된 토큰 정보도 삭제
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
                    "example": {"detail": "Invalid or expired access token"}
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
import redis
from typing import Optional
from datetime import timedelta
import json
from fastapi import HTTPException, status

class TokenManager:
    def __init__(self):
        self.redis_client = redis.Redis(
            host='localhost',
            port=6379,
            db=0,
            decode_responses=True
        )
        
    def store_tokens(self, user_id: int, access_token: str, refresh_token: str,
                    access_expires: int = 1800, refresh_expires: int = 604800):
        """
        사용자의 토큰을 저장합니다.
        access_expires: 30분 (1800초)
        refresh_expires: 7일 (604800초)
        """
        # 액세스 토큰 저장
        access_key = f"access_token:{user_id}"
        self.redis_client.setex(
            access_key,
            access_expires,
            access_token
        )

        # 리프레시 토큰 저장
        refresh_key = f"refresh_token:{user_id}"
        self.redis_client.setex(
            refresh_key,
            refresh_expires,
            refresh_token
        )

        # 토큰 매핑 저장 (토큰으로 user_id를 찾기 위함)
        self.redis_client.setex(
            f"token_user:{access_token}",
            access_expires,
            user_id
        )
        self.redis_client.setex(
            f"token_user:{refresh_token}",
            refresh_expires,
            user_id
        )

    def get_user_tokens(self, user_id: int) -> Optional[dict]:
        """사용자의 현재 토큰을 조회합니다."""
        access_token = self.redis_client.get(f"access_token:{user_id}")
        refresh_token = self.redis_client.get(f"refresh_token:{user_id}")
        
        if access_token and refresh_token:
            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }
        return None

    def validate_token(self, token: str, token_type: str = "access") -> int:
        """토큰의 유효성을 검증하고 user_id를 반환합니다."""
        user_id = self.redis_client.get(f"token_user:{token}")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
            
        if token_type == "access":
            stored_token = self.redis_client.get(f"access_token:{user_id}")
        else:
            stored_token = self.redis_client.get(f"refresh_token:{user_id}")
            
        if token != stored_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked"
            )
            
        return int(user_id)

    def revoke_tokens(self, user_id: int):
        """사용자의 모든 토큰을 무효화합니다."""
        # 기존 토큰 가져오기
        tokens = self.get_user_tokens(user_id)
        if tokens:
            # 토큰 매핑 삭제
            self.redis_client.delete(f"token_user:{tokens['access_token']}")
            self.redis_client.delete(f"token_user:{tokens['refresh_token']}")
            
        # 사용자 토큰 삭제
        self.redis_client.delete(f"access_token:{user_id}")
        self.redis_client.delete(f"refresh_token:{user_id}")

token_manager = TokenManager()
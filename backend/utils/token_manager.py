from typing import Optional
from datetime import datetime, timedelta
import json
from fastapi import HTTPException, status

class TokenManager:
    def __init__(self):
        # 메모리 기반 토큰 저장소
        self.tokens = {}
        
    def store_tokens(self, user_id: int, access_token: str, refresh_token: str,
                    access_expires: int = 1800, refresh_expires: int = 604800):
        """
        사용자의 토큰을 저장합니다.
        access_expires: 30분 (1800초)
        refresh_expires: 7일 (604800초)
        """
        now = datetime.now()
        
        # 토큰 정보 저장
        self.tokens[user_id] = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "access_expires": now + timedelta(seconds=access_expires),
            "refresh_expires": now + timedelta(seconds=refresh_expires)
        }
        
        # 토큰으로 user_id 매핑
        self.tokens[access_token] = {"user_id": user_id, "type": "access"}
        self.tokens[refresh_token] = {"user_id": user_id, "type": "refresh"}

    def get_user_tokens(self, user_id: int) -> Optional[dict]:
        """사용자의 현재 토큰을 조회합니다."""
        user_tokens = self.tokens.get(user_id)
        if user_tokens and isinstance(user_tokens, dict) and "access_token" in user_tokens:
            now = datetime.now()
            # 만료된 토큰 확인
            if now > user_tokens["access_expires"] or now > user_tokens["refresh_expires"]:
                self.revoke_tokens(user_id)
                return None
            return {
                "access_token": user_tokens["access_token"],
                "refresh_token": user_tokens["refresh_token"]
            }
        return None

    def validate_token(self, token: str, token_type: str = "access") -> int:
        """토큰의 유효성을 검증하고 user_id를 반환합니다."""
        token_data = self.tokens.get(token)
        if not token_data or token_data.get("type") != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
            
        user_id = token_data["user_id"]
        user_tokens = self.tokens.get(user_id)
        
        if not user_tokens or not isinstance(user_tokens, dict):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked"
            )
            
        now = datetime.now()
        if token_type == "access" and now > user_tokens["access_expires"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Access token expired"
            )
        elif token_type == "refresh" and now > user_tokens["refresh_expires"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token expired"
            )
            
        return int(user_id)

    def revoke_tokens(self, user_id: int):
        """사용자의 모든 토큰을 무효화합니다."""
        user_tokens = self.tokens.get(user_id)
        if user_tokens and isinstance(user_tokens, dict) and "access_token" in user_tokens:
            # 토큰 매핑 삭제
            self.tokens.pop(user_tokens["access_token"], None)
            self.tokens.pop(user_tokens["refresh_token"], None)
            
        # 사용자 토큰 삭제
        self.tokens.pop(user_id, None)

token_manager = TokenManager()
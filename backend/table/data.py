from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
from model import models

router = APIRouter(
    prefix="/data",
    tags=["data"]
)

# Jinja2 템플릿 설정
templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def admin_main(request: Request):
    return templates.TemplateResponse(
        "admin.html",
        {"request": request}
    )

@router.get("/users", response_class=HTMLResponse)
async def view_users(request: Request, db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return templates.TemplateResponse(
        "table.html",
        {
            "request": request,
            "title": "Users Table",
            "headers": ["user_id", "id", "nickname", "password", "profile_image", "created_at"],
            "rows": [[getattr(user, col) for col in ["user_id", "id", "nickname", "password", "profile_image", "created_at"]] for user in users]
        }
    )

@router.get("/posts", response_class=HTMLResponse)
async def view_posts(request: Request, db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return templates.TemplateResponse(
        "table.html",
        {
            "request": request,
            "title": "Posts Table",
            "headers": ["id", "user_id", "emotion_type", "content", "ai_content", "created_at", "is_shared", "is_solved"],
            "rows": [[getattr(post, col) for col in ["id", "user_id", "emotion_type", "content", "ai_content", "created_at", "is_shared", "is_solved"]] for post in posts]
        }
    )

@router.get("/comments", response_class=HTMLResponse)
async def view_comments(request: Request, db: Session = Depends(get_db)):
    comments = db.query(models.Comment).all()
    return templates.TemplateResponse(
        "table.html",
        {
            "request": request,
            "title": "Comments Table",
            "headers": ["comment_id", "user_id", "post_id", "content", "created_at"],
            "rows": [[getattr(comment, col) for col in ["comment_id", "user_id", "post_id", "content", "created_at"]] for comment in comments]
        }
    )

@router.get("/likes", response_class=HTMLResponse)
async def view_likes(request: Request, db: Session = Depends(get_db)):
    likes = db.query(models.Like).all()
    return templates.TemplateResponse(
        "table.html",
        {
            "request": request,
            "title": "Likes Table",
            "headers": ["id", "user_id", "post_id", "created_at"],
            "rows": [[getattr(like, col) for col in ["id", "user_id", "post_id", "created_at"]] for like in likes]
        }
    )
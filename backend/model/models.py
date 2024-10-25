from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
    id = Column(String, unique=True, index=True)
    nickname = Column(String)
    password = Column(String)
    profile_image = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    posts = relationship("Post", back_populates="user", cascade="all, delete-orphan" )
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan" )
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan" )

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    emotion_type = Column(String)
    content = Column(String)
    ai_content = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_shared = Column(Boolean, default=False)
    is_solved = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan" )
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan" )

class Comment(Base):
    __tablename__ = "comments"
    
    comment_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"))
    content = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")

class Like(Base):
    __tablename__ = "likes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")
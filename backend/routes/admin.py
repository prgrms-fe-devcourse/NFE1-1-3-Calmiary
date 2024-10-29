# routes/admin.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from database import get_db, engine, Base
from model import models
from model.schemas import MessageResponse
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

router = APIRouter(
    prefix="/admin", 
    tags=["Admin"]
)

# 개발 모드 확인용 전역 변수
IS_DEVELOPMENT = True  # 개발 중에는 True로 설정

@router.post("/db/reset",
    response_model=MessageResponse,
    summary="데이터베이스 초기화 (개발 환경 전용)",
    description="데이터베이스의 모든 테이블을 삭제하고 다시 생성합니다."
)
async def reset_database():
    if not IS_DEVELOPMENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="이 기능은 개발 환경에서만 사용할 수 있습니다."
        )
    
    try:
        # 모든 테이블 삭제
        Base.metadata.drop_all(bind=engine)
        
        # 테이블 다시 생성
        Base.metadata.create_all(bind=engine)
        
        return MessageResponse(message="데이터베이스가 성공적으로 초기화되었습니다.")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"데이터베이스 초기화 중 오류가 발생했습니다: {str(e)}"
        )

@router.get("/db/stats",
    summary="데이터베이스 통계 (개발 환경 전용)",
    description="각 테이블의 현재 레코드 수를 반환합니다."
)
async def get_database_stats(db: Session = Depends(get_db)):
    if not IS_DEVELOPMENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="이 기능은 개발 환경에서만 사용할 수 있습니다."
        )
    
    try:
        stats = {
            "users": db.query(models.User).count(),
            "posts": db.query(models.Post).count(),
            "comments": db.query(models.Comment).count(),
            "likes": db.query(models.Like).count()
        }
        
        return stats
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"통계 조회 중 오류가 발생했습니다: {str(e)}"
        )
    
# routes/admin.py에 추가

@router.get("/dashboard", 
    response_class=HTMLResponse,
    summary="데이터베이스 관리 대시보드",
    description="데이터베이스의 모든 테이블 내용을 확인할 수 있는 관리자 페이지입니다."
)
async def admin_dashboard():
    html_content = """
      <!doctype html>
<html>
  <head>
    <title>Calmiary Database Dashboard</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        background-color: #f5f5f5;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #333;
        text-align: center;
        margin-bottom: 30px;
      }

      .tab-container {
        margin-top: 20px;
      }

      .tab-buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }

      .tab-button {
        padding: 10px 20px;
        border: none;
        background-color: #e0e0e0;
        cursor: pointer;
        border-radius: 5px;
        flex: 1;
        font-size: 16px;
        transition: background-color 0.3s;
      }

      .tab-button.active {
        background-color: #007bff;
        color: white;
      }

      .tab-content {
        display: none;
        margin-top: 20px;
      }

      .tab-content.active {
        display: block;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      th,
      td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #f8f9fa;
        font-weight: bold;
      }

      tr:hover {
        background-color: #f5f5f5;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }

      .stat-card {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }

      .stat-number {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
      }

      .stat-label {
        color: #666;
        margin-top: 5px;
      }

      .controls {
        margin-bottom: 20px;
        display: flex;
        gap: 10px;
      }

      .button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
      }

      .refresh-btn {
        background-color: #28a745;
        color: white;
      }

      .reset-btn {
        background-color: #dc3545;
        color: white;
      }

      .datetime {
        color: #666;
        font-size: 14px;
      }
      .add-button {
        background-color: #28a745;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 10px;
      }

      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .modal-content {
        position: relative;
        background-color: white;
        margin: 15% auto;
        padding: 20px;
        width: 80%;
        max-width: 500px;
        border-radius: 8px;
      }

      .close {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 28px;
        cursor: pointer;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .form-group input,
      .form-group textarea,
      .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .submit-btn {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .action-buttons {
        display: flex;
        gap: 5px;
      }

      .action-button {
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }

      .visibility-toggle {
        background-color: #17a2b8;
        color: white;
      }

      .solve-toggle {
        background-color: #28a745;
        color: white;
      }

      td div {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* 상세보기 버튼 스타일 */
      .detail-view {
        background-color: #6c757d;
        color: white;
      }

      /* 모달 내 pre 태그 스타일 */
      .modal-content pre {
        margin: 10px 0;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 5px;
        max-height: 300px;
        overflow-y: auto;
      }

      .delete-btn {
        background-color: #dc3545;
        color: white;
        padding: 4px 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .delete-btn:hover {
        background-color: #c82333;
      }

      /* 선택 박스 스타일 */
      select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 10px;
      }

      /* 모달 내용 스타일 */
      .modal-content {
        max-width: 500px;
        width: 90%;
      }

      .action-button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
      }

      .visibility-toggle {
          background-color: #17a2b8;
          color: white;
      }

      .visibility-toggle.active {
          background-color: #138496;
      }

      .solve-toggle {
          background-color: #28a745;
          color: white;
      }

      .solve-toggle.active {
          background-color: #218838;
      }

      .status-controls {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
      }

      .status-row {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
      }

      .modal-content pre {
          font-family: inherit;
          font-size: 14px;
          line-height: 1.6;
      }

      .profile-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
}

.image-action-button {
    padding: 4px 8px;
    font-size: 12px;
    margin-left: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.image-action-button:hover {
    background-color: #0056b3;
}

    </style>
  </head>
  <body>
    <div class="container">
      <h1>Calmiary Database Dashboard</h1>

      <div class="controls">
        <button class="button refresh-btn" onclick="refreshData()">
          새로고침
        </button>
        <button class="button reset-btn" onclick="resetDatabase()">
          DB 초기화
        </button>
      </div>

      <div class="stats" id="statsContainer">
        <!-- 통계 데이터가 여기에 들어갑니다 -->
      </div>

      <div class="tab-container">
        <div class="tab-buttons">
          <button class="tab-button active" onclick="showTab('users')">
            사용자
          </button>
          <button class="tab-button" onclick="showTab('posts')">게시글</button>
          <button class="tab-button" onclick="showTab('comments')">댓글</button>
          <button class="tab-button" onclick="showTab('likes')">좋아요</button>
        </div>

        <div id="users" class="tab-content active">
          <button class="add-button" onclick="showModal('userModal')">
              사용자 추가
          </button>
          <table id="usersTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자 ID</th>
                <th>닉네임</th>
                <th>프로필 이미지</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>


        <div id="posts" class="tab-content">
          <button class="add-button" onclick="showModal('postModal')">
            게시글 추가
          </button>
          <table id="postsTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>작성자 ID</th>
                <th>내용</th>
                <th>AI 답변</th>
                <th>감정</th>
                <th>공개여부</th>
                <th>해결여부</th>
                <th>생성일</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

        <div id="comments" class="tab-content">
          <button class="add-button" onclick="showModal('commentModal')">
            댓글 추가
          </button>
          <table id="commentsTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>작성자 ID</th>
                <th>게시글 ID</th>
                <th>내용</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

        <div id="likes" class="tab-content">
          <button class="add-button" onclick="showModal('likeModal')">
            좋아요 추가
          </button>
          <table id="likesTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자 ID</th>
                <th>게시글 ID</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 모달 템플릿들 -->
    <div id="userModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>사용자 추가</h2>
        <form id="userForm">
          <div class="form-group">
            <label>아이디</label>
            <input type="text" name="id" required />
          </div>
          <div class="form-group">
            <label>닉네임</label>
            <input type="text" name="nickname" required />
          </div>
          <div class="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" class="submit-btn">추가</button>
        </form>
      </div>
    </div>

    <div id="postModal" class="modal">
      <div class="modal-content">
          <span class="close">&times;</span>
          <h2>게시글 추가</h2>
          <form id="postForm" onsubmit="handlePostSubmit(event)">
            <div class="form-group">
              <label>작성자 ID</label>
              <select name="user_id" required>
                <option value="">작성자 선택</option>
              </select>
            </div>
            <div class="form-group">
              <label>감정 타입</label>
              <select name="emotion_type" required>
                <option value="">감정 선택</option>
                <option value="happy">행복</option>
                <option value="sad">슬픔</option>
                <option value="angry">화남</option>
                <option value="anxious">불안</option>
                <option value="worried">걱정</option>
              </select>
            </div>
            <div class="form-group">
              <label>내용</label>
              <textarea name="content" required rows="4" placeholder="걱정되는 내용을 입력해주세요."></textarea>
            </div>
            <button type="submit" class="submit-btn">추가</button>
          </form>
      </div>
    </div>

    <div id="profileImageModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>프로필 이미지 업데이트</h2>
        <form id="profileImageForm">
            <input type="hidden" name="user_id" id="profileImageUserId">
            <div class="form-group">
                <label>이미지 파일</label>
                <input type="file" name="file" accept="image/*" required>
            </div>
            <button type="submit" class="submit-btn">업로드</button>
        </form>
    </div>
</div>

    <div id="commentModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>댓글 추가</h2>
        <form id="commentForm" onsubmit="handleCommentSubmit(event)">
          <div class="form-group">
            <label>작성자 ID</label>
            <select name="user_id" required></select>
          </div>
          <div class="form-group">
            <label>게시글 ID</label>
            <select name="post_id" required></select>
          </div>
          <div class="form-group">
            <label>내용</label>
            <textarea name="content" required></textarea>
          </div>
          <button type="submit" class="submit-btn">추가</button>
        </form>
      </div>
    </div>

    <div id="likeModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>좋아요 추가</h2>
        <form id="likeForm" onsubmit="handleLikeSubmit(event)">
          <div class="form-group">
            <label>사용자 ID</label>
            <select name="user_id" required>
              <option value="">사용자 선택</option>
            </select>
          </div>
          <div class="form-group">
            <label>게시글 ID</label>
            <select name="post_id" required>
              <option value="">게시글 선택</option>
            </select>
          </div>
          <button type="submit" class="submit-btn">좋아요</button>
        </form>
      </div>
    </div>

    <script>

      async function handlePostSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
          user_id: parseInt(formData.get('user_id')),
          emotion_type: formData.get('emotion_type'),
          content: formData.get('content')
        };
        
        try {
          const response = await fetch('/post/write/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || '게시글 작성 중 오류가 발생했습니다.');
          }

          const result = await response.json();
          alert('게시글이 추가되었습니다.');
          form.reset();
          document.getElementById('postModal').style.display = "none";
          refreshData();
        } catch (error) {
          alert(error.message);
          console.error('Error:', error);
        }
      }

      async function showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';

        try {
        // 사용자 목록이 필요한 모든 모달에 대한 조건
        if (modalId === 'likeModal' || modalId === 'commentModal' || modalId === 'postModal') {
            // 사용자 목록 가져오기
            const response = await fetch('/admin/db/table/users');
            const users = await response.json();
            
            const userSelect = modal.querySelector('select[name="user_id"]');
            userSelect.innerHTML = '<option value="">작성자 선택</option>' + 
                users.map(user => 
                    `<option value="${user.user_id}">${user.id} (${user.nickname})</option>`
                ).join('');

            // 게시글 목록은 좋아요와 댓글 모달에만 필요
            if (modalId === 'likeModal' || modalId === 'commentModal') {
                const postsResponse = await fetch('/admin/db/table/posts');
                const posts = await postsResponse.json();
                const postSelect = modal.querySelector('select[name="post_id"]');
                postSelect.innerHTML =
                    '<option value="">게시글 선택</option>' +
                    posts
                        .filter((post) => post.is_shared)
                        .map(
                            (post) =>
                                `<option value="${post.id}">ID: ${post.id} - ${post.content.substring(0, 30)}...</option>`
                        )
                        .join('');
            }
        }
        } catch (error) {
          console.error('데이터 로드 중 오류:', error);
          alert('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      }

      async function handleLikeSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const user_id = formData.get('user_id');
        const post_id = formData.get('post_id');

        try {
          const response = await fetch(
            `/community/post/${post_id}/like?user_id=${user_id}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(
              error.detail || '좋아요 처리 중 오류가 발생했습니다.'
            );
          }

          const result = await response.json();
          alert(result.message); // "공감을 표시했습니다." 또는 "공감이 취소되었습니다."
          form.reset();
          document.getElementById('likeModal').style.display = 'none';
          refreshData(); // 테이블 데이터 새로고침
        } catch (error) {
          alert(error.message);
        }
      }

      // 모달 닫기
      document.querySelectorAll('.close').forEach((closeBtn) => {
        closeBtn.onclick = function () {
          this.closest('.modal').style.display = 'none';
        };
      });

      // 외부 클릭 시 모달 닫기
      window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
          event.target.style.display = 'none';
        }
      };

      // 사용자 선택 옵션 업데이트
      async function updateUserSelect(select) {
        const response = await fetch('/admin/db/table/users');
        const users = await response.json();
        select.innerHTML = users
          .map(
            (user) =>
              `<option value="${user.user_id}">${user.id} (${user.nickname})</option>`
          )
          .join('');
      }

      // 게시글 선택 옵션 업데이트
      async function updatePostSelect(select) {
        const response = await fetch('/admin/db/table/posts');
        const posts = await response.json();
        select.innerHTML = posts
          .map(
            (post) =>
              `<option value="${post.id}">${post.id} - ${post.content.substring(0, 20)}...</option>`
          )
          .join('');
      }

      async function handleCommentSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
          const response = await fetch(
            `/community/post/${data.post_id}/comment`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: parseInt(data.user_id),
                content: data.content,
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(
              error.detail || '댓글 작성 중 오류가 발생했습니다.'
            );
          }

          const result = await response.json();
          alert('댓글이 추가되었습니다.');
          form.reset();
          document.getElementById('commentModal').style.display = 'none';
          refreshData(); // 테이블 데이터 새로고침
        } catch (error) {
          alert(error.message);
        }
      }

      // 폼 제출 핸들러
      document.getElementById('userForm').onsubmit = async function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
          const response = await fetch('/user/add/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
          });
          if (response.ok) {
            alert('사용자가 추가되었습니다.');
            e.target.reset();
            document.getElementById('userModal').style.display = 'none';
            refreshData();
          } else {
            throw new Error('API 오류');
          }
        } catch (error) {
          alert('사용자 추가 중 오류가 발생했습니다.');
        }
      };

      document.getElementById('postForm').onsubmit = async function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
          const response = await fetch('/post/write/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
          });
          if (response.ok) {
            alert('게시글이 추가되었습니다.');
            e.target.reset();
            document.getElementById('postModal').style.display = 'none';
            refreshData();
          } else {
            throw new Error('API 오류');
          }
        } catch (error) {
          alert('게시글 추가 중 오류가 발생했습니다.');
        }
      };

      document.getElementById('commentForm').onsubmit = async function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        try {
          const response = await fetch(
            `/community/post/${data.post_id}/comment`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: data.user_id,
                content: data.content,
              }),
            }
          );
          if (response.ok) {
            alert('댓글이 추가되었습니다.');
            e.target.reset();
            document.getElementById('commentModal').style.display = 'none';
            refreshData();
          } else {
            throw new Error('API 오류');
          }
        } catch (error) {
          alert('댓글 추가 중 오류가 발생했습니다.');
        }
      };

      // 게시글 관련 액션 버튼 추가
      function updateTable(tableName, data) {
        const tbody = document.querySelector(`#${tableName}Table tbody`);
        tbody.innerHTML = '';

        data.forEach((item) => {
          const row = document.createElement('tr');
          switch (tableName) {
            case 'likes':
              row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.user_id}</td>
                    <td>${item.post_id}</td>
                    <td>${formatDate(item.created_at)}</td>
                    <td>
                        <button onclick="deleteLike(${item.id})" class="action-button delete-btn">
                            삭제
                        </button>
                    </td>
                `;
              break;
              case 'posts':
                row.innerHTML = `
                  <td>${item.id}</td>
                  <td>${item.user_id}</td>
                  <td>
                    <div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                          title="${item.content}">
                        ${item.content}
                    </div>
                  </td>
                  <td>
                    <div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                          title="${item.ai_content || ''}">
                        ${item.ai_content || '-'}
                    </div>
                  </td>
                  <td>${item.emotion_type}</td>
                  <td>
                    <button onclick="toggleVisibility(${item.id}, ${item.user_id})" 
                            class="action-button visibility-toggle">
                        ${item.is_shared ? '공개' : '비공개'}
                    </button>
                  </td>
                  <td>
                    <button onclick="toggleSolved(${item.id}, ${item.user_id})" 
                            class="action-button solve-toggle">
                        ${item.is_solved ? '해결' : '미해결'}
                    </button>
                  </td>
                  <td>${formatDate(item.created_at)}</td>
                  <td>
                    <button onclick="showPostDetail(${item.id})" class="action-button detail-view">
                        상세보기
                    </button>
                  </td>
                `;
                break;
            // ... 다른 케이스들
          }
          tbody.appendChild(row);
        });
      }

      async function showPostDetail(postId) {
        try {
        const response = await fetch(`/diary/post/${postId}`);
        const post = await response.json();
        
        const detailModal = document.createElement('div');
        detailModal.className = 'modal';
        detailModal.style.display = 'block';
        
        detailModal.innerHTML = `
            <div class="modal-content" style="width: 90%; max-width: 800px;">
              <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
              <h2>게시글 상세 내용</h2>
              <div style="margin-top: 20px;">
                <h3>걱정 내용</h3>
                <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
                  ${post.content}
                </pre>
                
                <h3>AI 답변</h3>
                <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
                  ${post.ai_content}
                </pre>
                
                <div style="margin-top: 20px;">
                  <p><strong>작성일:</strong> ${formatDate(post.created_at)}</p>
                  <p><strong>감정:</strong> ${post.emotion_type}</p>
                  
                  <div class="status-controls" style="margin-top: 20px;">
                      <div class="status-row" style="margin-bottom: 10px;">
                          <span><strong>공개 상태:</strong></span>
                          <button 
                            onclick="toggleVisibility(${post.id}, ${post.user_id})"
                            class="action-button visibility-toggle ${post.is_shared ? 'active' : ''}"
                            style="margin-left: 10px;">
                            ${post.is_shared ? '공개' : '비공개'}
                          </button>
                      </div>
                      <div class="status-row">
                        <span><strong>해결 상태:</strong></span>
                        <button 
                          onclick="toggleSolved(${post.id}, ${post.user_id})"
                          class="action-button solve-toggle ${post.is_solved ? 'active' : ''}"
                          style="margin-left: 10px;">
                          ${post.is_solved ? '해결' : '미해결'}
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            `;
            
            document.body.appendChild(detailModal);
            
            // 모달 닫기 이벤트
            detailModal.onclick = function(event) {
                if (event.target === detailModal) {
                    detailModal.remove();
                }
            };
        } catch (error) {
            console.error('Error:', error);
            alert('게시글 정보를 불러오는데 실패했습니다.');
        }
    }

      async function deleteLike(likeId) {
        if (!confirm('이 좋아요를 삭제하시겠습니까?')) {
          return;
        }

        try {
          const response = await fetch(`/community/like/${likeId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('좋아요 삭제 중 오류가 발생했습니다.');
          }

          alert('좋아요가 삭제되었습니다.');
          refreshData();
        } catch (error) {
          alert(error.message);
        }
      }

      // 게시글 공개/비공개 토글
      async function toggleVisibility(postId, userId) {
    try {
        const response = await fetch(`/diary/post/${postId}/visibility`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        });
        
        if (!response.ok) {
            throw new Error('공개 상태 변경에 실패했습니다.');
        }
        
        const updatedPost = await response.json();
        
        // 테이블과 상세보기 모달 모두 업데이트
        refreshData();
        
        // 현재 열려있는 상세보기 모달의 버튼 업데이트
        const visibilityButton = document.querySelector(`.modal .visibility-toggle`);
        if (visibilityButton) {
            visibilityButton.textContent = updatedPost.is_shared ? '공개' : '비공개';
            visibilityButton.classList.toggle('active', updatedPost.is_shared);
        }
    } catch (error) {
        alert(error.message);
    }
}

      // 게시글 해결 여부 토글
      async function toggleSolved(postId, userId) {
    try {
        const response = await fetch(`/diary/post/${postId}/solve`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        });
        
        if (!response.ok) {
            throw new Error('해결 상태 변경에 실패했습니다.');
        }
        
        const updatedPost = await response.json();
        
        // 테이블과 상세보기 모달 모두 업데이트
        refreshData();
        
        // 현재 열려있는 상세보기 모달의 버튼 업데이트
        const solveButton = document.querySelector(`.modal .solve-toggle`);
        if (solveButton) {
            solveButton.textContent = updatedPost.is_solved ? '해결' : '미해결';
            solveButton.classList.toggle('active', updatedPost.is_solved);
        }
    } catch (error) {
        alert(error.message);
    }
}
      // 좋아요 토글 기능
      async function toggleLike(postId, userId) {
        try {
          const response = await fetch(
            `/community/post/${postId}/like?user_id=${userId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (response.ok) {
            refreshData();
          } else {
            throw new Error('API 오류');
          }
        } catch (error) {
          alert('좋아요 처리 중 오류가 발생했습니다.');
        }
      }
      function showTab(tabName) {
        // 모든 탭 내용과 버튼 비활성화
        document.querySelectorAll('.tab-content').forEach((tab) => {
          tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-button').forEach((button) => {
          button.classList.remove('active');
        });

        // 선택한 탭 활성화
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');
      }

      function formatDate(dateStr) {
          const date = new Date(dateStr);
          return new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
              timeZone: 'Asia/Seoul'
          }).format(date);
      }

      function updateStats(data) {
        const statsHtml = `
                    <div class="stat-card">
                        <div class="stat-number">${data.users}</div>
                        <div class="stat-label">사용자</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${data.posts}</div>
                        <div class="stat-label">게시글</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${data.comments}</div>
                        <div class="stat-label">댓글</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${data.likes}</div>
                        <div class="stat-label">좋아요</div>
                    </div>
                `;
        document.getElementById('statsContainer').innerHTML = statsHtml;
      }

      async function refreshData() {
        try {
          // 통계 데이터 가져오기
          const statsResponse = await fetch('/admin/db/stats');
          const stats = await statsResponse.json();
          updateStats(stats);

          // 각 테이블 데이터 가져오기
          const tables = ['users', 'posts', 'comments', 'likes'];
          for (const table of tables) {
            const response = await fetch(`/admin/db/table/${table}`);
            const data = await response.json();
            updateTable(table, data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          alert('데이터를 가져오는 중 오류가 발생했습니다.');
        }
      }

      function updateTable(tableName, data) {
        const tbody = document.querySelector(`#${tableName}Table tbody`);
        tbody.innerHTML = '';

        data.forEach((item) => {
          const row = document.createElement('tr');
          switch (tableName) {
            case 'users':
    row.innerHTML = `
        <td>${item.user_id}</td>
        <td>${item.id}</td>
        <td>${item.nickname}</td>
        <td>
            ${item.profile_image ? 
                `<img src="${item.profile_image}" alt="프로필" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
                 <button onclick="updateProfileImage(${item.user_id})" class="action-button">이미지 변경</button>` 
                : 
                `<button onclick="updateProfileImage(${item.user_id})" class="action-button">이미지 추가</button>`
            }
        </td>
        <td>${formatDate(item.created_at)}</td>
    `;
    break;
            case 'posts':
              row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.user_id}</td>
        <td>
            <div style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                 title="${item.content}">
                ${item.content}
            </div>
        </td>
        <td>
            <div style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                 title="${item.ai_content || ''}">
                ${item.ai_content || '-'}
            </div>
        </td>
        <td>${item.emotion_type}</td>
        <td>
            <button onclick="toggleVisibility(${item.id}, ${item.user_id})" 
                    class="action-button visibility-toggle">
                ${item.is_shared ? '공개' : '비공개'}
            </button>
        </td>
        <td>
            <button onclick="toggleSolved(${item.id}, ${item.user_id})" 
                    class="action-button solve-toggle">
                ${item.is_solved ? '해결' : '미해결'}
            </button>
        </td>
        <td>${formatDate(item.created_at)}</td>
        <td>
            <button onclick="showPostDetail(${item.id})" class="action-button detail-view">
                상세보기
            </button>
        </td>
    `;
              break;
            case 'comments':
              row.innerHTML = `
                                <td>${item.comment_id}</td>
                                <td>${item.user_id}</td>
                                <td>${item.post_id}</td>
                                <td>${item.content}</td>
                                <td>${formatDate(item.created_at)}</td>
                            `;
              break;
            case 'likes':
              row.innerHTML = `
                                <td>${item.id}</td>
                                <td>${item.user_id}</td>
                                <td>${item.post_id}</td>
                                <td>${formatDate(item.created_at)}</td>
                            `;
              break;
          }
          tbody.appendChild(row);
        });
      }

      async function updateProfileImage(userId) {
    const modal = document.getElementById('profileImageModal');
    document.getElementById('profileImageUserId').value = userId;
    modal.style.display = 'block';
}

// 프로필 이미지 업로드 폼 제출 핸들러
document.getElementById('profileImageForm').onsubmit = async function(e) {
    e.preventDefault();
    const userId = document.getElementById('profileImageUserId').value;
    const formData = new FormData();
    const fileInput = this.querySelector('input[type="file"]');
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch(`/profile/${userId}/profile-image`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('프로필 이미지 업데이트 실패');
        }

        const result = await response.json();
        alert('프로필 이미지가 업데이트되었습니다.');
        document.getElementById('profileImageModal').style.display = 'none';
        refreshData();
    } catch (error) {
        alert('프로필 이미지 업데이트 중 오류가 발생했습니다.');
        console.error(error);
    }
};

      async function resetDatabase() {
        if (!confirm('정말로 데이터베이스를 초기화하시겠습니까?')) {
          return;
        }

        try {
          const response = await fetch('/admin/db/reset', { method: 'POST' });
          const result = await response.json();
          alert(result.message);
          refreshData();
        } catch (error) {
          console.error('Error resetting database:', error);
          alert('데이터베이스 초기화 중 오류가 발생했습니다.');
        }
      }

      // 페이지 로드 시 데이터 가져오기
      refreshData();
    </script>
  </body>
</html>

    """
    return HTMLResponse(content=html_content)

# 테이블별 데이터 조회 엔드포인트 추가
@router.get("/db/table/{table_name}", 
    summary="테이블 데이터 조회",
    description="지정된 테이블의 모든 데이터를 조회합니다."
)
async def get_table_data(table_name: str, db: Session = Depends(get_db)):
    if not IS_DEVELOPMENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="이 기능은 개발 환경에서만 사용할 수 있습니다."
        )
    
    try:
        model_map = {
            'users': models.User,
            'posts': models.Post,
            'comments': models.Comment,
            'likes': models.Like
        }
        
        if table_name not in model_map:
            raise HTTPException(
                status_code=404,
                detail=f"테이블 '{table_name}'을 찾을 수 없습니다."
            )
        
        data = db.query(model_map[table_name]).all()
        return data
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"데이터 조회 중 오류가 발생했습니다: {str(e)}"
        )
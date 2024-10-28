import styled from 'styled-components';
import LikePost from '../components/LikePost';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';

export default function ProfileLikePage() {
  const [sortOption, setSortOption] = useState('최신순');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const posts = [
    {
      id: 1,
      content: 'Post 1',
      likes: 3,
      createdAt: '2023-10-21',
      nickname: '사람1',
      comments: 4,
    },
    {
      id: 2,
      content: 'Post 2',
      likes: 10,
      createdAt: '2023-10-19',
      nickname: '사람2',
      comments: 11,
    },
    {
      id: 3,
      content: 'Post 3',
      likes: 5,
      createdAt: '2023-10-18',
      nickname: '사람3',
      comments: 7,
    },
  ];

  const sortedPosts = [...posts].sort((firstPost, secondPost) => {
    if (sortOption === '최신순') {
      return (
        new Date(secondPost.createdAt).getTime() -
        new Date(firstPost.createdAt).getTime()
      );
    } else if (sortOption === '좋아요순') {
      return secondPost.likes - firstPost.likes;
    }
    return 0;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <ProfileContainer>
        <TextArea>좋아요 한 고민들</TextArea>
        <DropdownArea>
          <Dropdown
            category={sortOption}
            data={['최신순', '좋아요순']}
            setState={setSortOption}
            isOpen={isDropdownOpen}
            setSelectedDropDown={toggleDropdown}
          />
        </DropdownArea>
        {sortedPosts.map((post) => (
          <LikePost
            key={post.id}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            nickname={post.nickname}
            comments={post.comments}
          />
        ))}
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  background-color: #181625;
  gap: 3rem;
  color: #fff;
  overflow: auto;

  .dropdown {
    display: flex;
    width: 100%;
    justify-content: end;
  }

  .dropdown select {
    margin-right: 2rem;
  }
`;

const DropdownArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-right: 5rem;
`;

const TextArea = styled.div`
  padding-top: 3rem;
  color: #fff;
`;

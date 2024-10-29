import styled from 'styled-components';
import LikePost from '../components/LikePost';
import Dropdown from '../components/Dropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface PostPropTypes {
  id: number;
  content: string;
  like_count: number;
  created_at: string;
  nickname: string;
  comment_count: number;
}

export default function ProfileLikePage() {
  const [sortOption, setSortOption] = useState<
    '최신순' | '좋아요순' | '오래된순'
  >('최신순');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<PostPropTypes[]>([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        let sortBy = '';
        if (sortOption === '최신순') {
          sortBy = 'latest';
        } else if (sortOption === '좋아요순') {
          sortBy = 'likes';
        } else if (sortOption === '오래된순') {
          sortBy = 'comments';
        }
        const response = await axios.get(
          `https://calmiary-be.org/profile/posts/liked/1?sort_by=${sortBy}&page=1&limit=5`
        );

        setLikedPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch liked posts:', error);
      }
    };

    fetchLikedPosts();
  }, [sortOption]);

  console.log(likedPosts);

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
            data={['최신순', '좋아요순', '오래된순']}
            setState={
              setSortOption as React.Dispatch<React.SetStateAction<string>>
            }
            isOpen={isDropdownOpen}
            setSelectedDropDown={toggleDropdown}
          />
        </DropdownArea>
        {likedPosts.map((post) => (
          <LikePost
            key={post.id}
            content={post.content}
            likes={post.like_count}
            createdAt={post.created_at}
            nickname={post.nickname}
            comments={post.comment_count}
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
  background-color: ${({ theme }) => theme.colors.brand_bg};
  gap: 3rem;
  color: ${({ theme }) => theme.colors.write_white200};
  overflow: auto;
`;

const DropdownArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-right: 1.5rem;
`;

const TextArea = styled.div`
  padding-top: 3rem;
  color: ${({ theme }) => theme.colors.write_white200};
`;

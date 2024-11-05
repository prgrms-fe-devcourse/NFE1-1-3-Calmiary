import styled from 'styled-components';
import { UserInfo } from './index';
import { UserDataType } from '../types';
import { Icon } from '../../../components/ui/Icon';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { queryClient } from '../../../network/react-query/queryClient';

const DetailPostContent = ({
  content,
  likesCount,
  userInfo,
  user_id,
}: {
  content?: string;
  likesCount?: number;
  userInfo?: UserDataType;
  user_id?: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(
    likesCount === 0 ? 0 : likesCount
  );
  const { id } = useParams<{ id: string }>();
  const post_id = Number(id);

  const empathyMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(
        `/api/community/post/${post_id}/like`,
        {},
        {
          params: {
            user_id,
          },
        }
      );

      const previousEmpathy = queryClient.getQueryData(['empathy']);
      return { ...response.data, previousEmpathy };
    },
    onMutate: async () => {
      setIsLiked((prev) => !prev);
      setCurrentLikes((prev) => (isLiked ? (prev ?? 0) - 1 : (prev ?? 0) + 1));

      return { previousLikes: currentLikes };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousLikes !== undefined) {
        setCurrentLikes(context.previousLikes);
        setIsLiked(!isLiked);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['empathy'] });
    },
  });

  const handleLikeToggle = () => {
    if (!isLiked) {
      empathyMutation.mutate();
    } else {
      setIsLiked(false);
      setCurrentLikes((prev) => Math.max(0, (prev ?? 0) - 1));
    }
  };

  useEffect(() => {
    setCurrentLikes(likesCount === 0 ? 0 : likesCount);
  }, [likesCount]);

  return (
    <Wrapper>
      <UserInfo user_info={userInfo} />
      <Content>{content}</Content>
      <EmpathyLayout onClick={handleLikeToggle}>
        <Icon
          type={isLiked ? 'community_filed_heart' : 'community_empty_heart'}
          alt={isLiked ? 'filledHeart' : 'emptyHeart'}
        />
        <p>{currentLikes}</p>
      </EmpathyLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 26px;
  border-radius: 15px;
  background-color: rgb(147, 143, 164, 0.4);
  width: 100%;
`;

const Content = styled.div`
  line-height: 22px;
  color: #ffffff;
`;

const EmpathyLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: #ffffff;
  }
`;

export default DetailPostContent;

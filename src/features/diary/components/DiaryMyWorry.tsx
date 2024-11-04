import styled from 'styled-components';
import Switch from './Switch';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../home/hooks/useUser';
import { togglePostVisibility } from '../api/diary';
import { DiaryMyWorryPropTypes } from '../types/diaryTypes';

const switchVariants = {
  public: { x: 2 },
  private: { x: 0 },
};

const DiaryMyWorry = ({
  id,
  content,
  isShared,
  isSolved,
}: DiaryMyWorryPropTypes) => {
  const [isPublic, setIsPublic] = useState(isShared);
  const { getUserId } = useUser();
  const userId = getUserId().user_id;
  const queryClient = useQueryClient();

  const { mutate: toggleVisibility } = useMutation({
    mutationFn: () => togglePostVisibility(id, Number(userId)),
    onSuccess: (updatedPost) => {
      setIsPublic(updatedPost.is_shared);
      queryClient.setQueryData(['diary', 'detail', id.toString()], updatedPost);
      queryClient.invalidateQueries({ queryKey: ['diary'] });
    },
    onError: (error) => {
      setIsPublic(isShared);
      console.error('Failed to toggle visibility:', error);
    },
  });

  const handleSwitchChange = () => {
    toggleVisibility();
  };

  return (
    <WorryWrapper>
      <WorryHeader>
        <p>나의 고민</p>
        <SwitchWrapper>
          <motion.span
            initial={false}
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 0.2 }}
          >
            {isPublic ? '공개' : '비공개'}
          </motion.span>
          <motion.div
            variants={switchVariants}
            animate={isPublic ? 'public' : 'private'}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Switch checked={isPublic} onChange={handleSwitchChange} />
          </motion.div>
        </SwitchWrapper>
      </WorryHeader>
      <WorryContent
        as={motion.div}
        $isSolved={isSolved}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSolved ? 0.7 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </WorryContent>
    </WorryWrapper>
  );
};

const WorryWrapper = styled.div`
  width: 100%;
`;

const WorryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  p {
    margin-left: 10px;
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.write_white200};
  }
`;

const WorryContent = styled.div<{ $isSolved: boolean }>`
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.brand_bg};
  border: 3px solid ${({ theme }) => theme.colors.diary_100};
  opacity: ${({ $isSolved }) => ($isSolved ? 0.7 : 1)};
  word-break: break-all;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export default DiaryMyWorry;

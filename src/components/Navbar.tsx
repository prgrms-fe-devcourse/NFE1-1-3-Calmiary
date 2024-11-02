import styled from 'styled-components';
import { Icon } from './ui/Icon';
import { Link, useNavigate } from 'react-router-dom';
import useWritingModeStore from '../stores/writingModeStore';
import useWritingResponseStore from '../stores/writingResponseStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { resetMode } = useWritingModeStore((state) => state.actions);
  const { resetResponse } = useWritingResponseStore((state) => state.actions);

  const handleWritingClick = () => {
    // 현재 writing 페이지에 있을 때
    if (location.pathname === '/writing') {
      // state와 함께 같은 페이지로 이동
      console.log('same');
      navigate('', {
        replace: true,
        state: { reload: Date.now() },
      });
    } else {
      // 다른 페이지에서 writing으로 이동
      resetResponse();
      resetMode();
      navigate('/writing');
    }
  };

  return (
    <NavWrapper>
      <Link to="/growth">
        <Icon type="nav_home" size={20} />
      </Link>
      <Link to="/growth">
        <Icon type="nav_log" size={20} />
      </Link>
      <WriteLayout onClick={handleWritingClick}>
        <Icon type="nav_write" size={24} />
      </WriteLayout>
      <Link to="/community">
        <Icon type="nav_community" size={20} />
      </Link>
      <Link to="/profile">
        <Icon type="nav_profile" size={20} />
      </Link>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  z-index: 1002;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({ theme }) => theme.layout.max_width};
  padding: 0.4rem 3rem;
  background: ${({ theme }) => theme.colors.brand_bg};
`;

const WriteLayout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.write_gray200};
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;

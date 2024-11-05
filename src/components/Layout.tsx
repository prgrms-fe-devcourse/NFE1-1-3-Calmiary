import styled from 'styled-components';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <MobileWrapper>
      <Outlet />
      <Navbar />
    </MobileWrapper>
  );
};

export default Layout;

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 340px;
  max-width: 430px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

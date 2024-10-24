import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useScreenSize from './hook/useScreenSize.ts';
import styled from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './network/react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WritingPage from './features/writing/WritingPage.tsx';

import ProfileMainPage from './features/profile/pages/ProfileMainPage.tsx';
import ProfileUserPage from './features/profile/pages/ProfileUserPage.tsx';
import ProfileLikePage from './features/profile/pages/ProfileLikePage.tsx';

const router = createBrowserRouter([
  {
    path: '/profile',
    element: <ProfileMainPage />,
  },
  {
    path: '/userProfile',
    element: <ProfileUserPage />,
  },
  {
    path: '/likePost',
    element: <ProfileLikePage />,
  },
  { path: '/writing', element: <WritingPage /> },
]);

function App() {
  useScreenSize();

  return (
    <QueryClientProvider client={queryClient}>
      <MobileWrapper>
        <RouterProvider router={router} />
      </MobileWrapper>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 430px;
  height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;

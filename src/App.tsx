import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useScreenSize from './hook/useScreenSize.ts';
import styled from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './network/react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CommunityPage from './features/community/CommunityPage.tsx';
import WritingPage from './features/writing/WritingPage.tsx';
import DetailCommunityPage from './features/community/pages/DetailCommunityPage.tsx';

import ProfileMainPage from './features/profile/pages/ProfileMainPage.tsx';
import ProfileUserPage from './features/profile/pages/ProfileUserPage.tsx';
import ProfileLikePage from './features/profile/pages/ProfileLikePage.tsx';
import LoginPage from './features/home/pages/LoginPage.tsx';
import SignUpPage from './features/home/pages/SignUpPage.tsx';
import GrowthFactorPage from './features/home/pages/GrothPage.tsx';
import ProfileSharePage from './features/profile/pages/ProfileSharePage.tsx';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
      {
        path: '/sharePost',
        element: <ProfileSharePage />,
      },
      { path: '/writing', element: <WritingPage /> },
      {
        path: '/community',
        element: <CommunityPage />,
      },
      {
        path: '/detail/community/:id',
        element: <DetailCommunityPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/growth',
        element: <GrowthFactorPage />,
      },
    ],
  },
]);

function App() {
  useScreenSize();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

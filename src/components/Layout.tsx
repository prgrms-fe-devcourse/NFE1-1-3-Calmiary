import LandingPage from '../features/landing/pages/LandingPage';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div>
      {isLandingPage ? (
        <LandingPage />
      ) : (
        <div>
          <Outlet />
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Layout;

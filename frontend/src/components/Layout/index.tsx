import { Outlet } from 'react-router-dom';
import Header from '../Header';
// import { Portal } from '@mui/material';
import Portal from '../Portal';
import { usePortal } from '../../context/PortalContext';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/authContext';

const Layout = () => {
  const { closePortal } = usePortal();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser?.userName) {
      closePortal();
    }
  }, [authUser]);

  return (
    <div className='main-container'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Portal />
    </div>
  );
};

export default Layout;

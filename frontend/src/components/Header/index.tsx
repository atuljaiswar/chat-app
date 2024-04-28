import AuthComponent from '../AuthComponent';
import { usePortal } from '../../context/PortalContext';
import './style.scss';
import { useAuthContext } from '../../context/authContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [isPopShow, setPopShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { openPortal, closePortal } = usePortal();
  const contextData = useAuthContext();
  const { authUser, setAuthUser } = contextData;
  console.log({ contextData });

  const handleOpenAuth = async () => {
    console.log('HITTED');
    if (!authUser?.userName) {
      openPortal(<AuthComponent onClose={closePortal} />);
    } else {
      try {
        const response = await axios({
          method: 'post',
          url: '/api/auth/logout',
          headers: { 'Content-Type': 'application/json' },
        });
        setLoading(false);
        console.log({ response });
        const { data } = response;
        if (data.error) {
          throw new Error(data.error);
        }
        localStorage.removeItem('chat-user');
        setAuthUser(null);
      } catch (error) {
        setLoading(false);
        console.log('Error while submiting login request', error);
      }
    }
    console.log('HITTEDD');
    localStorage.removeItem('chat-user');
  };

  const handleMouseEvent = (flag: any) => {
    if (!isMobile) {
      setPopShow(flag);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust the threshold as needed
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Run on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className='wrapper'>
      <div className='header-wrapper flex justify-between items-center mt-4 md:mt-2'>
        <h1>
          <a href='/' className='font-bold text-[20px] md:text-[30px]'>
            <span className='text-[#EB4E17] '>Chat</span> App
          </a>
        </h1>
        <div
          className='relative pb-3'
          onMouseEnter={() => handleMouseEvent(true)}
          onMouseLeave={() => handleMouseEvent(false)}
        >
          <img
            src='/icons/avatar.svg'
            alt='Avatar'
            className='w-[30px] h-[30px] cursor-pointer mt-[10px]'
          />
          <ul
            className={`absolute pt-3 top-[40px] left-0 w-[100px] bg-white py-3 px-3 ${
              isPopShow ? 'block' : 'hidden'
            }`}
          >
            <li className='text-black cursor-pointer' onClick={handleOpenAuth}>
              {authUser?.userName ? 'Logout' : 'Login'}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

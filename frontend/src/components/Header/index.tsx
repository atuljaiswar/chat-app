import AuthComponent from '../AuthComponent';
import { usePortal } from '../../context/PortalContext';
import './style.scss';
import { useAuthContext } from '../../context/authContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [isPopShow, setPopShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  const { openPortal, closePortal } = usePortal();
  const contextData = useAuthContext();
  const { authUser, setAuthUser } = contextData;
  console.log({ authUser });
  const handleOpenAuth = async () => {
    if (!authUser?.userName) {
      openPortal(<AuthComponent onClose={closePortal} />);
    } else {
      try {
        const response = await axios({
          method: 'post',
          url: '/api/auth/logout',
          headers: { 'Content-Type': 'application/json' },
        });
        // setLoading(false);
        const { data } = response;
        if (data.error) {
          throw new Error(data.error);
        }
        localStorage.removeItem('chat-user');
        setAuthUser(null);
      } catch (error) {
        // setLoading(false);
        console.log('Error while submiting login request', error);
      }
    }
    localStorage.removeItem('chat-user');
  };

  const handleMouseEvent = (flag: any) => {
    if (!isMobile) {
      setPopShow(flag);
    }
  };

  const handleClick = () => {
    setPopShow((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      // Adjust the threshold as needed
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Run on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className='wrapper'>
      <div className='header-wrapper flex justify-between items-center mt-4 md:mt-2'>
        <h1>
          <a href='/' className='font-bold text-[25px] md:text-[30px]'>
            <span className='text-[#EB4E17] '>Chat</span> App
          </a>
        </h1>
        <div
          className='relative pb-3'
          onMouseEnter={() => handleMouseEvent(true)}
          onMouseLeave={() => handleMouseEvent(false)}
          onClick={handleClick}
        >
          {!authUser?.userName ? (
            <img
              src='/icons/avatar.svg'
              alt='Avatar'
              className='w-[40px] h-[40px] cursor-pointer mt-[10px]'
            />
          ) : (
            <span className='user w-[40px] h-[40px] flex items-center justify-center rounded-full border-[2px] border-solid border-white'>
              <span className='font-extrabold text-[1rem]'>
                {authUser?.userName}
              </span>
            </span>
          )}
          <ul
            className={`absolute pt-3 top-[50px] right-0 w-[100px] bg-white py-3 px-3 ${
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

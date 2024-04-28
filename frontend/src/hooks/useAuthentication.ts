import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/authContext';

const useAuthentication = () => {
  const [isLoading, setLoading] = useState(false);
  const contextData = useAuthContext();
  console.log({ contextData });
  const { setAuthUser } = contextData;
  const handleLoginSubmit = async (data: any) => {
    console.log('handleLoginSubmit', data);
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: '/api/auth/login',
        headers: { 'Content-Type': 'application/json' },
        data,
      });
      setLoading(false);
      console.log({ response });
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('chat-user', JSON.stringify(response.data));
      setAuthUser(response.data);
      console.log({ response });
    } catch (error) {
      setLoading(false);
      console.log('Error while submiting login request', error);
    }
  };

  const handleSignSubmit = async (data: any) => {
    console.log('handleSignSubmit', data);
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: '/api/auth/signup',
        headers: { 'Content-Type': 'application/json' },
        data,
      });
      setLoading(false);
      console.log({ response });
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error while submiting signup request', error);
    }
  };

  return { handleLoginSubmit, handleSignSubmit, isLoading };
};

export default useAuthentication;

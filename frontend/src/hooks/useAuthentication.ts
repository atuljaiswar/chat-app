import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/authContext';

const useAuthentication = (props: any) => {
  const { setToggale, setSubmit } = props;
  const [isLoading, setLoading] = useState(false);

  const contextData = useAuthContext();
  const { setAuthUser } = contextData;

  const handleLoginSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: '/api/auth/login',
        headers: { 'Content-Type': 'application/json' },
        data,
      });
      setLoading(false);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('chat-user', JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      setLoading(false);
      console.log('Error while submiting login request', error);
    }
  };

  const handleSignSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios({
        method: 'post',
        url: '/api/auth/signup',
        headers: { 'Content-Type': 'application/json' },
        data,
      });
      setLoading(false);

      if (data.error) {
        throw new Error(data.error);
      }
      setToggale(false);
      setSubmit(true);
    } catch (error) {
      setLoading(false);
      console.log('Error while submiting signup request', error);
    }
  };

  return {
    handleLoginSubmit,
    handleSignSubmit,
    isLoading,
  };
};

export default useAuthentication;

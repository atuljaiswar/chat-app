import axios from 'axios';
import { useState } from 'react';

const useGetMessages = () => {
  const [messages, setMessages] = useState(null);
  const getMessages = async (userId: any) => {
    try {
      const response = await axios.get(`api/messages/${userId}`);
      setMessages(response?.data);
    } catch (error) {
      console.log('Error while getting messages', error);
    }
  };
  return {
    messages,
    getMessages,
  };
};

export default useGetMessages;

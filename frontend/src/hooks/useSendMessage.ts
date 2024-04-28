import axios from 'axios';
import { useState } from 'react';
import { set } from 'react-hook-form';

const useSendMessage = () => {
  const [messages, setMessages] = useState(null);
  const [getMsgLoading, setGetMsgLoading] = useState(false);
  const sendMessage = async (data: any, receiverId: string) => {
    console.log('HITTED', data);
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/messages/send/${receiverId}`,
        data: JSON.stringify({ message: data?.message }),
      });
      console.log({ response }, { messages });
      let tempState: any = messages;
      tempState = [...tempState, response?.data];
      setMessages(tempState);
      // getMessages(receiverId);
    } catch (error) {
      console.log('Error while sending message', error);
    }
  };

  const getMessages = async (userId: any) => {
    try {
      setGetMsgLoading(true);
      const response = await axios.get(`api/messages/${userId}`);
      console.log('getMessages', response);
      setMessages(response?.data);
      setGetMsgLoading(false);
    } catch (error) {
      console.log('Error while getting messages', error);
      setGetMsgLoading(false);
    }
  };

  return {
    sendMessage,
    getMessages,
    messages,
    getMsgLoading,
    setMessages,
  };
};

export default useSendMessage;

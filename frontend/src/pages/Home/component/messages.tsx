import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useAuthContext } from '../../../context/authContext';
import SkeletonMessage from './skelton';
import { useSocketContext } from '../../../context/socketContext';
import notificationSound from '../../../../public/iphone_notification.mp3';
import { extractTime } from '../../../../utils/extractTime';

const Messages = (props: any) => {
  const { messages, chatingTo, getMsgLoading, setMessages } = props;
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const lastMessageRef = useRef<HTMLDivElement | null>();

  useEffect(() => {
    socket.on('newMessage', (newMessage: any) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [messages, socket, setMessages]);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef?.current) {
        lastMessageRef?.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [messages]);

  return (
    <Box className='messages min-h-[500px] max-h-[500px] overflow-y-scroll pb-5'>
      {getMsgLoading ? (
        <Box className='flex justify-between px-4'>
          <Box>
            <SkeletonMessage />
            <SkeletonMessage />
            <SkeletonMessage />
            <SkeletonMessage />
          </Box>
          <Box className='mt-20'>
            <SkeletonMessage />
            <SkeletonMessage />
            <SkeletonMessage />
            <SkeletonMessage />
          </Box>
        </Box>
      ) : (
        <>
          {!getMsgLoading && messages?.length ? (
            <Box className=''>
              {messages?.map((item: any, index: number) => {
                const fromMe = item?.senderId === authUser?._id;
                const lastMsgBox = index === messages?.length - 1;
                return (
                  <Box
                    className={`mt-4 flex gap-x-2 px-4 ${
                      fromMe ? 'justify-end' : 'justify-start '
                    }`}
                    key={index}
                    ref={lastMsgBox ? lastMessageRef : undefined}
                  >
                    <Box className='flex flex-col'>
                      <span
                        key={index}
                        className={`${
                          fromMe ? 'bg-[#007bff]' : 'bg-gray-500'
                        } inline-block text-white px-4 py-2 rounded-[20px]`}
                      >
                        {item?.message}
                      </span>
                      <span className='chat-footer opacity-50 text-xs flex gap-1 items-center ml-auto'>
                        {extractTime(item?.createdAt)}
                      </span>
                    </Box>

                    <img
                      src={`${
                        fromMe ? authUser?.profilePic : chatingTo?.profilePic
                      }`}
                      alt='Profile'
                      className='w-[40px] h-[40px]'
                    />
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className='flex justify-center items-center'>
              Sent a message to start conversation
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default React.memo(Messages);

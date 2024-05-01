import { Box, IconButton, TextField } from '@mui/material';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import SendIcon from '@mui/icons-material/Send';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import useSendMessage from '../../../hooks/useSendMessage';
import Messages from './messages';
import { useEffect } from 'react';

const ChartRoom = (props: any) => {
  const { authUser, chatingTo, setChating } = props;
  const methods = useForm();
  const { control, handleSubmit, reset } = methods;
  const { sendMessage, getMessages, messages, getMsgLoading, setMessages } =
    useSendMessage();

  const handleSendMessage = async (data: any) => {
    if (!data?.message) return;
    const receiverId = chatingTo?._id;
    await sendMessage(data, receiverId);
    reset();
  };

  useEffect(() => {
    if (!chatingTo?._id) return;
    getMessages(chatingTo?._id);
  }, [chatingTo]);
  return (
    <>
      {!chatingTo?.username ? (
        <Box className='w-full h-full flex flex-col  items-center justify-center text-white font-medium text-[22px]'>
          <span>Welcome {authUser?.fullName}</span>
          <span>Select a chart to start</span>
          <MarkUnreadChatAltOutlinedIcon fontSize='large' />
        </Box>
      ) : (
        <Box className='chat-box rounded-tr-[5px] rounded-tb-[5px] flex flex-col'>
          <Box className='bg-[#aeb1b6] text-white capitalize p-2 flex justify-between'>
            <Box>
              To:
              <span className='text-black ml-1 font-medium'>
                {chatingTo?.fullname}
              </span>
            </Box>
            <Box onClick={() => setChating(null)} className='cursor-pointer'>
              <img
                src='/icons/back.svg'
                alt='Back'
                className='w-[30px] h-[30px]'
              />
            </Box>
          </Box>
          <Messages
            messages={messages}
            chatingTo={chatingTo}
            getMsgLoading={getMsgLoading}
            setMessages={setMessages}
          />
          <Box className='px-3'>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleSendMessage)}>
                <Controller
                  name='message'
                  defaultValue=''
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      variant='outlined'
                      value={value}
                      onChange={onChange}
                      sx={{
                        backgroundColor: '#000',
                        borderRadius: '50px',
                        color: '#fff',
                        width: '100%',
                      }}
                      placeholder='Search'
                      InputProps={{
                        sx: {
                          color: '#fff',
                          borderRadius: '50px',
                          '&.MuiInputBase-input::placeholder': {
                            color: '#000', // Style for the placeholder text
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#000', // Adjust the border color as needed
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '000', // Adjust the hover border color as needed
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#000', // Adjust the focused border color as needed
                          },
                          '&:focus': {
                            outline: 'none', // Remove the default blue outline on focus
                          },
                        },
                        endAdornment: (
                          <IconButton type='submit'>
                            <SendIcon sx={{ color: '#fff' }} />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                />
              </form>
            </FormProvider>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChartRoom;

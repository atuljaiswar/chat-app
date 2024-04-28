import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
} from '@mui/material';

import { useMemo, useState } from 'react';
import { useAuthContext } from '../../../context/authContext';
import './style.scss';
import ChartRoom from './chartRoom';
import { useSocketContext } from '../../../context/socketContext';

interface userArray {
  fullname: string;
  gender: string;
  profilePic: string;
  username: string;
  _id: string;
}

interface SideBarUserProps {
  sideBarsUsers: userArray[];
}

const userList: React.FC<SideBarUserProps> = (props) => {
  const [searchText, setSearchText] = useState(''); // State to store search term
  const [chatingTo, setChating] = useState<any>(null);
  const { authUser } = useAuthContext();
  const { socket, onlineUsers } = useSocketContext();
  const { sideBarsUsers } = props;
  const handleSearchChange = (event: any) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchText(inputValue);
  };

  const handleItemClick = (userId: any) => {
    // Handle click event for the list item with the specified userId
    console.log('Clicked user ID:', userId);
    const currentChatingUser = sideBarsUsers?.find(
      (item) => item?._id === userId
    );
    setChating(currentChatingUser);
  };

  const userList = useMemo(() => {
    console.log('HItedd');
    let data = null;
    if (sideBarsUsers?.length && searchText) {
      data = sideBarsUsers?.filter((item) =>
        item?.fullname.includes(searchText)
      );
      console.log('data', data);
    } else {
      console.log('ELSe');
      data = sideBarsUsers;
    }
    return data;
  }, [searchText, sideBarsUsers]);

  console.log({ sideBarsUsers }, { chatingTo });
  return (
    <Box className='custom-box flex w-[800px] min-h-[500px] '>
      <Box className='border-r-[1px] py-[20px] px-[15px] basis-[45%]'>
        <Box className='flex items-center'>
          <TextField
            variant='outlined'
            sx={{
              backgroundColor: '#000',
              borderRadius: '50px',
              color: '#fff',
            }}
            placeholder='Search'
            value={searchText}
            onChange={handleSearchChange}
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
            }}
          />
          <figure className='w-[50px] h-[50px] relative rounded-full bg-[#0886e8] ml-4'>
            <img
              src='/icons/search.svg'
              alt='Search'
              className='w-[20px] h-[20px] md:w-[30px] md:h-[30px] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
            />
          </figure>
        </Box>
        <List>
          {userList?.map((user) => {
            const isOnline = onlineUsers.includes(user?._id);
            console.log({ user }, { onlineUsers }, { isOnline });
            return (
              <ListItem
                key={user?._id}
                onClick={() => handleItemClick(user._id)}
              >
                <ListItemAvatar>
                  <Badge
                    variant='dot'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      '.MuiBadge-badge': {
                        backgroundColor: '#27ef27',
                      },
                    }}
                    invisible={!isOnline}
                  >
                    <Avatar alt={user?.fullname} src={user?.profilePic} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary={user?.fullname} className='capitalize' />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box className='basis-[55%] '>
        {<ChartRoom authUser={authUser} chatingTo={chatingTo} />}
      </Box>
    </Box>
  );
};

export default userList;

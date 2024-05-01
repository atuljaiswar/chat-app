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

import { useEffect, useMemo, useState } from 'react';
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
  const [isDesktop, setDevice] = useState(false);
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const { sideBarsUsers } = props;
  const handleSearchChange = (event: any) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchText(inputValue);
  };

  const handleItemClick = (userId: any) => {
    // Handle click event for the list item with the specified userId
    const currentChatingUser = sideBarsUsers?.find(
      (item) => item?._id === userId
    );
    setChating(currentChatingUser);
  };

  const userList = useMemo(() => {
    let data = null;
    if (sideBarsUsers?.length && searchText) {
      data = sideBarsUsers?.filter((item) =>
        item?.fullname.includes(searchText)
      );
    } else {
      data = sideBarsUsers;
    }
    return data;
  }, [searchText, sideBarsUsers]);

  const handleSize = () => {
    if (window.innerWidth >= 1024) {
      setDevice(true);
    } else {
      setDevice(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    handleSize();
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return (
    <Box className='custom-box flex w-full lg:w-[800px] min-h-[500px]'>
      <Box
        className={`border-r-[1px] py-[20px] px-[15px] basis-full lg:basis-[45%] ${
          isDesktop ? 'block' : !chatingTo ? 'block' : 'hidden'
        }`}
      >
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
          <figure className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] relative rounded-full bg-[#0886e8] ml-4'>
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
      <Box
        className={`basis-full lg:basis-[55%] ${
          isDesktop ? 'block' : chatingTo ? 'block' : 'hidden'
        }`}
      >
        {
          <ChartRoom
            authUser={authUser}
            chatingTo={chatingTo}
            setChating={setChating}
          />
        }
      </Box>
    </Box>
  );
};

export default userList;

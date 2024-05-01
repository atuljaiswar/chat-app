import axios from 'axios';
import { useEffect, useState } from 'react';

const useSidebarUser = (props: any) => {
  const { authUser } = props;
  // const [isLoading, setLoading] = useState(false);
  const [sideBarsUsers, setSideBarUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/api/users',
      });
      setSideBarUser(response?.data?.sidebarUsers);
    } catch (error) {
      console.log('Error while fetching sidebar user', error);
    }
  };

  useEffect(() => {
    authUser?.userName && fetchUserData();
  }, [authUser]);

  return {
    sideBarsUsers: sideBarsUsers,
  };
};

export default useSidebarUser;

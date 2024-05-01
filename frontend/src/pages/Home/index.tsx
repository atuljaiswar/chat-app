import { useAuthContext } from '../../context/authContext';
import useSidebarUser from '../../hooks/useSidebaUser';
import UserList from './component/userList';
import './style.scss';

const Home = () => {
  const contextData = useAuthContext();
  const { authUser } = contextData;
  const { sideBarsUsers } = useSidebarUser({ authUser });

  return (
    <div className='text-white'>
      {authUser?.userName ? <UserList sideBarsUsers={sideBarsUsers!} /> : null}
    </div>
  );
};

export default Home;

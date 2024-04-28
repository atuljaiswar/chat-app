import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthContext } from './authContext';
import { io } from 'socket.io-client';

export const socketContext = createContext<any>(null);

interface SocketProps {
  children: ReactNode;
}

export const SocketContextProvider = ({ children }: SocketProps) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const contextData = useAuthContext();
  const { authUser } = contextData;
  useEffect(() => {
    let socketInstance: any = null;
    if (authUser) {
      console.log('HITTED123', authUser);
      socketInstance = io('http://localhost:5000', {
        query: {
          userId: authUser?._id,
        },
      });
      setSocket(socketInstance);
      socketInstance.on('getOnlineUsers', (users: any) => {
        console.log('LISTEN', users);
        setOnlineUsers(users);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (socketInstance) {
        socketInstance.close();
        setSocket(null);
      }
    };
  }, [authUser]);
  console.log({ onlineUsers });
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;

export const useSocketContext = () => {
  return useContext(socketContext);
};

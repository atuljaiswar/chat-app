import React, { createContext, useContext, useState } from 'react';

const authContext = createContext<any>(null);

const AuthContext = ({ children }: any) => {
  const [authUser, setAuthUser] = useState<any>(
    JSON.parse(localStorage.getItem('chat-user')!) || null
  );
  return (
    <authContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(authContext);

import { useState } from 'react';
import SignUpForm from './component/SignUp';
import LoginForm from './component/Login';
import './style.scss';

const AuthComponent = (props: any) => {
  const [isSignUp, setToggale] = useState(false);
  const { onClose } = props;
  return (
    <>
      <div className='overlay' onClick={onClose}>
        test
      </div>
      <div className='auth-container'>
        <>
          {isSignUp ? (
            <SignUpForm setToggale={setToggale} />
          ) : (
            <LoginForm setToggale={setToggale} />
          )}
        </>
      </div>
    </>
  );
};

export default AuthComponent;

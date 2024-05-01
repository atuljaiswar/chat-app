import { useState } from 'react';
import SignUpForm from './component/SignUp';
import LoginForm from './component/Login';
import './style.scss';
import { Alert, Snackbar } from '@mui/material';

const AuthComponent = (props: any) => {
  const [isSignUp, setToggale] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const { onClose } = props;
  return (
    <>
      <Snackbar
        open={isSubmit}
        autoHideDuration={5000} // Close after 6 seconds
        onClose={() => setSubmit(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='success'>Success! Sign up successfully.</Alert>
      </Snackbar>
      <div className='overlay' onClick={onClose}>
        test
      </div>
      <div className='auth-container'>
        <>
          {isSignUp ? (
            <SignUpForm setToggale={setToggale} setSubmit={setSubmit} />
          ) : (
            <LoginForm setToggale={setToggale} />
          )}
        </>
      </div>
    </>
  );
};

export default AuthComponent;

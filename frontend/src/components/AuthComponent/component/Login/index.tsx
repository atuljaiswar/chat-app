import { Button, Container, InputLabel } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import TextFieldCompo from '../../../TextField';
import './style.scss';
import useAuthentication from '../../../../hooks/useAuthentication';

const LoginForm = ({ setToggale }: any) => {
  const { handleLoginSubmit } = useAuthentication();
  const methods = useForm();
  const { control, handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log({ data });
    handleLoginSubmit(data);
  };

  return (
    <div className='login-form'>
      <h1>
        <span className='login-text'>Login</span>
        <span className='chat-text'> Chat App</span>
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container className='containerCustom'>
            <InputLabel className='inputLabelCustom'>Username</InputLabel>
            <TextFieldCompo
              placeholder='Enter Username'
              type='text'
              name='username'
              control={control}
              required={true}
            />
          </Container>
          <Container className='containerCustom'>
            <InputLabel className='inputLabelCustom'>Password</InputLabel>
            <TextFieldCompo
              placeholder='Enter Password'
              type='password'
              name='password'
              control={control}
              required={true}
            />
          </Container>
          <Container>
            <span
              className='dont-acc'
              onClick={() => setToggale((prev: Boolean) => !prev)}
            >
              Dont have an account?
            </span>
            <Button
              type='submit'
              variant='contained'
              sx={{ display: 'block', width: '100%', borderRadius: '5px' }}
            >
              Login
            </Button>
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;

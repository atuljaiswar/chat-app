import {
  Button,
  Container,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Typography,
} from '@mui/material';
import TextFieldCompo from '../../../TextField';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import './style.scss';
import CheckboxCompo from '../../../Checkbox';
import useAuthentication from '../../../../hooks/useAuthentication';

const SignUpForm = ({ setToggale }: any) => {
  const { handleSignSubmit } = useAuthentication();
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    handleSignSubmit(data);
    console.log({ data });
  };
  return (
    <div className='signup-form'>
      <h1>
        <span className='signup-text'>SignUp</span>
        <span className='chat-text'> Chat App</span>
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container className='containerCustom'>
            <InputLabel className='inputLabelCustom'>Full Name</InputLabel>
            <TextFieldCompo
              placeholder='Enter Fullname'
              type='text'
              name='fullname'
              control={control}
              required={true}
            />
          </Container>
          <Container className='containerCustom'>
            <InputLabel className='inputLabelCustom'>User Name</InputLabel>
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
          <Container className='containerCustom'>
            <InputLabel className='inputLabelCustom'>
              Confirm Password
            </InputLabel>
            <TextFieldCompo
              placeholder='Re-Password'
              type='password'
              name='confirmPassword'
              control={control}
              required={true}
            />
          </Container>
          <Container className='containerCustom'>
            <InputLabel className='inputLabelCustom'>Gender</InputLabel>
            <Container sx={{ paddingLeft: '0 !important' }}>
              <FormControl component='fieldset'>
                <Controller
                  name='gender'
                  control={control}
                  rules={{ required: 'Please select a gender' }}
                  defaultValue=''
                  render={({ field, fieldState }) => (
                    <>
                      <RadioGroup aria-label='gender' {...field}>
                        <FormControlLabel
                          value='male'
                          control={<Radio sx={{ color: '#fff' }} />}
                          label='Male'
                          sx={{ color: '#fff' }}
                        />
                        <FormControlLabel
                          value='female'
                          control={<Radio sx={{ color: '#fff' }} />}
                          label='Female'
                          sx={{ color: '#fff' }}
                        />
                      </RadioGroup>
                      {fieldState.error && (
                        <Typography variant='body2' color='error'>
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Container>
          </Container>
          <Container>
            <span
              className='dont-acc'
              onClick={() => setToggale((prev: Boolean) => !prev)}
            >
              Already have account?
            </span>
            <Button
              type='submit'
              variant='contained'
              sx={{ display: 'block', width: '100%', borderRadius: '5px' }}
            >
              Sign Up
            </Button>
          </Container>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpForm;

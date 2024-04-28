import TextField from '@mui/material/TextField';
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from 'react-hook-form';
import './style.scss';
// import { makeStyles, createStyles } from '@mui/styles';

// const useStyles = makeStyles(() =>
//   createStyles({
//     textField: {
//       backgroundColor: '#000',
//       borderRadius: '5px',
//       '& .MuiInputBase-input': {
//         color: 'white',
//       },
//       '& .MuiInputBase-input:focus': {},
//     },
//   })
// );

interface TextFieldProps {
  control: any; // Adjust the type as needed
  placeholder: string;
  name: string;
  type: string;
  required?: boolean;
}

const TextFieldCompo: React.FC<TextFieldProps> = (props) => {
  const { control, placeholder, name, type, required = false } = props;
  const methods = useForm();
  const {
    formState: { errors },
  } = methods;
  console.log({ errors });
  return (
    <Controller
      name={name} // Field name for form data
      control={control}
      rules={{ required: required ? `${name} is required` : false }}
      defaultValue='' // Optional default value
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error ? error.message : ''}
          type={type}
          placeholder={placeholder}
          fullWidth={true}
          value={value}
          onChange={onChange}
          className='customTextfield'
        />
      )}
    />
  );
};

{
  /* <Controller
      name={name} // Field name for form data
      control={control}
      defaultValue='' // Optional default value
      render={({ field: { value, onChange } }) => (
        <TextField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          fullWidth
        />
      )}
    /> */
}

// <Controller
//   name={name} // Field name for form data
//   control={control}
//   defaultValue='' // Optional default value
//   render={({ field: { value, onChange } }) => (
//     <TextField
//       type='text'
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       // error={!!errors.username} // Show error if there's an error for "username"
//       // helperText={errors.username?.message} // Display error message
//       fullWidth
//     />
//   )}
// />

export default TextFieldCompo;

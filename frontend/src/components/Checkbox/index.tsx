import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CheckboxProps {
  control: any;
  name: string;
  label: string;
}

const CheckboxCompo: React.FC<CheckboxProps> = (props) => {
  const { control, name, label } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                checked={value}
                onChange={onChange}
                sx={{ color: '#fff' }}
              />
            }
            className='text-white'
          />
        )}
      />
    </>
  );
};

export default CheckboxCompo;

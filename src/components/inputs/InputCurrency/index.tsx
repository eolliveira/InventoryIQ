import { Control, Controller, UseFormRegister } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type InputCurrencyProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  register: UseFormRegister<any>;
  required?: boolean;
};

export default function InputCurrency({
  name,
  control,
  defaultValue,
  label,
  error,
  helperText,
  register,
  required,
}: InputCurrencyProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field: { value, onChange } }) => (
        <TextField
          {...register(name, {
            required: required ? 'Campo requirido' : undefined,
          })}
          fullWidth
          margin="dense"
          name={name}
          error={error}
          helperText={helperText}
          label={label}
          type="number"
          id={name}
          value={value ?? ''}
          onChange={onChange}
          size="small"
          InputProps={{
            size: 'small',
            sx: {
              height: 35,
              fontSize: 13,
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: 14,
            },
          }}
        />
      )}
    />
  );
}

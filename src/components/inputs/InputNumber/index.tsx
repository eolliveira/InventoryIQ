import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type InputNumberProps = {
  name: string;
  control: Control;
  defaultValue?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
};

export default function InputNumber({
  name,
  control,
  defaultValue,
  label,
  error,
  helperText,
  register,
  required,
}: InputNumberProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? undefined}
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

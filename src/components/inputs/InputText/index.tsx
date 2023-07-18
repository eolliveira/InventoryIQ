import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type InputTextProps = {
  name: string;
  control: Control;
  defaultValue?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
};

export default function InputText({
  name,
  control,
  defaultValue,
  label,
  error,
  helperText,
  register,
  required,
}: InputTextProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field: { value, onChange } }) => (
        <TextField
          {...register(name, { required: required ? 'Campo requerido' : undefined })}
          fullWidth
          margin="dense"
          name={name}
          error={error}
          helperText={helperText}
          label={label}
          type="text"
          id={name}
          value={value ?? ''}
          onChange={onChange}
          size="small"
          InputProps={{ size: 'small', sx: { height: 35, fontSize: 13 } }}
          InputLabelProps={{ sx: { fontSize: 14 } }}
        />
      )}
    />
  );
}

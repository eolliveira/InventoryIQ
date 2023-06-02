import { Control, Controller, UseFormRegister } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type InputMultilineProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  rows: number;
};

export default function InputMultiline({
  name,
  control,
  defaultValue,
  label,
  error,
  helperText,
  register,
  required,
  rows,
}: InputMultilineProps) {
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
          id={name}
          name={name}
          margin="dense"
          error={error}
          helperText={helperText}
          label={label}
          type="text"
          value={value ?? ''}
          fullWidth
          multiline
          rows={rows}
          defaultValue="Default Value"
          variant="outlined"
          onChange={onChange}
          size="small"
          InputProps={{
            size: 'small',
            sx: {
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

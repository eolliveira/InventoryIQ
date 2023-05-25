import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface FieldDateProps {
  control: Control<any, any>;
  defaultValue?: string;
  name: string;
  helperText?: string;
  label: string;
  register: UseFormRegister<any>;
  required?: boolean;
}

export default function FieldDate({
  control,
  name,
  label,
  defaultValue,
  helperText,
  register,
  required,
}: FieldDateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            {...register(name, {
              required: required ? 'Campo requirido' : undefined,
            })}
            format="DD/MM/YYYY"
            label={label}
            slotProps={{
              textField: { size: 'small', variant: 'outlined' },
            }}
            value={value ? dayjs(value) : undefined}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

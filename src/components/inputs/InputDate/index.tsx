import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface InputDateProps {
  control: Control<any, FieldValues>;
  name: string;
  helperText?: string;
  label: string;
  register: UseFormRegister<any>;
  required?: boolean;
}

export default function InputDate({ control, name, label, helperText, register, required }: InputDateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            {...register(name, { required: required ? 'Campo requirido' : undefined })}
            format="DD/MM/YYYY"
            label={label}
            slotProps={{
              textField: {
                margin: 'dense',
                size: 'small',
                variant: 'outlined',
                helperText: helperText,
                InputLabelProps: { style: { fontSize: 14 } },
                InputProps: { style: { fontSize: 13 } },
              },
            }}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(newValue)}
          />
        )}
      />
    </LocalizationProvider>
  );
}

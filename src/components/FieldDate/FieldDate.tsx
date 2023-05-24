import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

interface FieldDateProps {
  //refatorar os tipos
  control: Control<any, any>;
  name: string;
  label: string;
}

export default function FieldDate({ control, name, label }: FieldDateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePicker
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

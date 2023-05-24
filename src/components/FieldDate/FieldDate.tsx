import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FieldDate() {
  //   const [value, setValue] = useState<dayjs.Dayjs | null>(null);
  //   return (
  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //       <DatePicker
  //         sx={{ margin: 0 }}
  //         format="DD/MM/YYYY"
  //         value={value}
  //         defaultValue={dayjs('2022-04-17')}
  //         onChange={(newValue) => {
  //           setValue(newValue);
  //           console.log(newValue?.format('YYYY-MM-DD'));
  //         }}
  //       />
  //     </LocalizationProvider>
  //   );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Small picker"
          slotProps={{ textField: { size: 'small', variant: 'outlined' } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

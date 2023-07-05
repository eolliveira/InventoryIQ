import 'dayjs/locale/pt-br';

import Box from '@mui/material/Box';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SetStateAction } from 'react';
import { Dayjs } from 'dayjs';

interface InputDatePeriodProps {
  label: string;
  valueStart: Dayjs | null;
  valueEnd: Dayjs | null;
  onChangeStart: (date: SetStateAction<Dayjs | null>) => void;
  onChangeEnd: (date: SetStateAction<Dayjs | null>) => void;
}

export default function InputDatePeriod({
  label,
  valueStart,
  valueEnd,
  onChangeStart,
  onChangeEnd,
}: InputDatePeriodProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display={'flex'} flexWrap={'wrap'}>
        <DatePicker
          label={`${label} (De)`}
          format="DD/MM/YYYY"
          value={valueStart}
          onChange={onChangeStart}
          slotProps={{
            textField: {
              size: 'small',
              variant: 'outlined',
              InputLabelProps: {
                style: {
                  fontSize: 14,
                },
              },
              InputProps: {
                style: {
                  fontSize: 13,
                  borderRadius: 8,
                  width: 150,
                  height: 33,
                  marginLeft: 5,
                },
              },
            },
          }}
        />
        <DatePicker
          format="DD/MM/YYYY"
          label={`${label} (Até)`}
          value={valueEnd}
          onChange={onChangeEnd}
          slotProps={{
            textField: {
              size: 'small',
              variant: 'outlined',
              InputLabelProps: {
                style: {
                  fontSize: 14,
                },
              },
              InputProps: {
                style: {
                  fontSize: 13,
                  borderRadius: 8,
                  width: 150,
                  height: 33,
                  marginLeft: 5,
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}

import { FormControl, Select, MenuItem } from '@mui/material';
import {
  removeUnderline,
  toCamelCase,
} from '../../../../utils/StringConverter';
import InputLabel from '@mui/material/InputLabel';
import { Dispatch, SetStateAction } from 'react';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type PeriodFilterProps = {
  label?: string;
  setNumberPage?: Dispatch<SetStateAction<number>>;
  filterField?: string;
  setFieldFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
};

export default function PeriodFilter({
  label,
  setNumberPage,
  filterField,
  setFieldFilter,
  selectedItems,
}: PeriodFilterProps) {
  return (
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
    //     <DemoItem label="Uncontrolled picker" component="DateRangePicker">
    //       <DateRangePicker
    //         defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
    //       />
    //     </DemoItem>
    //     <DemoItem label="Controlled picker" component="DateRangePicker">
    //       <DateRangePicker
    //         value={value}
    //         onChange={(newValue) => setValue(newValue)}
    //       />
    //     </DemoItem>
    //   </DemoContainer>
    // </LocalizationProvider>
    <h1>teste</h1>
  );
}

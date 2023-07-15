import { FormControl, Select, MenuItem } from '@mui/material';
import { removeUnderline, toCamelCase } from '../../../../utils/StringConverter';
import InputLabel from '@mui/material/InputLabel';
import { Dispatch, SetStateAction } from 'react';

type SelectFilterProps = {
  label?: string;
  setNumberPage?: Dispatch<SetStateAction<number>>;
  filterField: string;
  setFieldFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
};

export default function SelectFilter({
  label,
  setNumberPage,
  filterField,
  setFieldFilter,
  selectedItems,
}: SelectFilterProps) {
  return (
    <FormControl size="small" sx={{ marginRight: 0.5 }}>
      <InputLabel sx={{ fontSize: 14 }}>{label}</InputLabel>
      <Select
        sx={{
          height: 35,
          borderRadius: 2,
          minWidth: 120,
          fontSize: '14px',
          color: 'primary',
        }}
        id="demo-simple-select-label"
        label={label}
        value={filterField}
        onChange={(e) => {
          setNumberPage && setNumberPage(0);
          setFieldFilter(e.target.value);
        }}
      >
        {selectedItems.map((item, index) => (
          <MenuItem sx={{ fontSize: 14 }} key={index} value={item}>
            {removeUnderline(toCamelCase(item))}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

import { FormControl, Select, MenuItem } from '@mui/material';
import {
  removeUnderline,
  toCamelCase,
} from '../../../../utils/StringConverter';
import InputLabel from '@mui/material/InputLabel';

type SelectFilterProps = {
  label?: string;
  filterField: string;
  setFieldFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
};

export default function SelectFilter({
  label,
  filterField,
  setFieldFilter,
  selectedItems,
}: SelectFilterProps) {
  return (
    <FormControl
      size="small"
      sx={{
        backgroundColor: 'rgb(248, 250, 252)',
        height: 35,
        borderRadius: 2,
        fontSize: '14px',
        color: 'primary',
      }}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        sx={{
          height: 35,
          borderRadius: 2,
          minWidth: 120,
          fontSize: '14px',
          color: 'primary',
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select-label"
        label={label}
        value={filterField}
        onChange={(e) => {
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

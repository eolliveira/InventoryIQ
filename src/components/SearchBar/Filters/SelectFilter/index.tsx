import { FormControl, Select, MenuItem } from '@mui/material';
import {
  removeUnderline,
  toCamelCase,
} from '../../../../utils/StringConverter';

type SelectFilterProps = {
  filterField: string;
  setFieldFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
};

export default function SelectFilter({
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
      <Select
        sx={{
          height: 35,
          borderRadius: 2,
          fontSize: '14px',
          color: 'primary',
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
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

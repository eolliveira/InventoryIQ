import { FormControl, Select, MenuItem } from '@mui/material';
import { removeUnderline, toCamelCase } from '../../../utils/StringConverter';

type InputSelectProps = {
  inputField: string;
  setInputField: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
};

export default function InputSelect({
  inputField,
  setInputField,
  selectedItems,
}: InputSelectProps) {
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
        value={inputField}
        onChange={(e) => {
          setInputField(e.target.value);
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

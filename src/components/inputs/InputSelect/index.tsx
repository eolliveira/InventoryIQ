import { FormControl, Select, MenuItem } from '@mui/material';
import { removeUnderline, toCamelCase } from '../../../utils/StringConverter';
import InputLabel from '@mui/material/InputLabel';

type InputSelectProps = {
  label: string;
  required?: boolean;
  inputField?: string;
  setInputField: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: string[];
};

export default function InputSelect({ label, required, inputField, setInputField, selectedItems }: InputSelectProps) {
  return (
    <FormControl
      size="small"
      sx={{
        backgroundColor: 'rgb(248, 250, 252)',
        color: 'primary',
      }}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        sx={{ color: 'primary' }}
        required={required}
        labelId="demo-simple-select-label"
        id="demo-simple-select-label"
        label={label}
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

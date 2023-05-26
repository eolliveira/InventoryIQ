import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type TextInfoProps = {
  label: string;
  text?: string;
};

export default function TextInfo({ label, text }: TextInfoProps) {
  return (
    <Box margin={'20px  20px'}>
      <Typography fontSize={14} margin={0} fontWeight={'normal'}>
        {label}
      </Typography>
      <Typography
        fontWeight={'unset'}
        fontSize={14}
        color={'rgb(102, 112, 133)'}
      >
        {text}
      </Typography>
    </Box>
  );
}

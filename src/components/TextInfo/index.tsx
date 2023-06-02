import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type TextInfoProps = {
  label: string;
  text?: string;
};

export default function TextInfo({ label, text }: TextInfoProps) {
  return (
    <Box margin={'20px  20px'}>
      <Typography
        color={'primary'}
        fontSize={14}
        margin={0}
        fontWeight={'bold'}
      >
        {label}
      </Typography>
      <Typography marginTop={0.5} fontSize={14} color={'rgb(145, 145, 145)'}>
        {text}
      </Typography>
    </Box>
  );
}

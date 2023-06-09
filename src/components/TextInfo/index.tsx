import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type TextInfoProps = {
  label: string;
  text?: string;
};

export default function TextInfo({ label, text }: TextInfoProps) {
  return (
    <Stack margin={'0px 0px 15px 0px'} direction={'row'} spacing={1}>
      <Typography color={'primary'} fontSize={14} fontWeight={'bold'}>
        {label + ':'}
      </Typography>
      <Typography
        fontSize={14}
        color={'primary'}
        style={{ wordBreak: 'break-word' }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

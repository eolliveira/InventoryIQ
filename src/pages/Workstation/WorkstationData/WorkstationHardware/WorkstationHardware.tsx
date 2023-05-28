import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type WorkstationHardwareProps = {
  teste: number;
};

export default function WorkstationHardware({
  teste,
}: WorkstationHardwareProps) {
  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
      <Typography
        margin={2}
        fontSize={16}
        fontWeight={'bold'}
        letterSpacing={1}
        color={'primary'}
        variant="h2"
      >
        Armazenamento
      </Typography>
      <Divider color="gray" />
      <h1>dados</h1>
    </Card>
  );
}

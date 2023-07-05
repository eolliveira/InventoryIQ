import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Particao } from '../../../../../types/Workstation/Particao';
import { Disco } from '../../../../../types/Workstation/Disco';
import ProgressBarDisc from '../ProgressBarDisc';
import DiscFullIcon from '@mui/icons-material/DiscFull';
import { Stack } from '@mui/material';

type HardDriveProps = {
  disco: Disco;
};

export default function HardDrive({ disco }: HardDriveProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #e9e9e9',
        borderRadius: 2,
        padding: 1.5,
        marginBottom: 2,
      }}
    >
      <Stack direction={'row'} spacing={1}>
        <DiscFullIcon color="primary" />
        <Typography fontWeight={'bold'} color={'primary'} fontSize={16}>
          {disco.modelo}
        </Typography>
      </Stack>

      <Typography color={'primary'} fontSize={13}>
        {'Capacidade: ' +
          (Number(disco.capacidade) / Number((1e9).toFixed(1))).toFixed(1) +
          `${
            Number(
              (Number(disco.capacidade) / Number((1e9).toFixed(1))).toFixed(1)
            ) < 1000
              ? ' GB'
              : ' TB'
          }`}
      </Typography>
      <Divider color="gray" />
      {disco.particoes.map((particao: Particao) => (
        <>
          <Typography marginTop={1} color={'primary'} fontSize={13}>
            {'Disco (' + particao.pontoMontagem + ')'}
          </Typography>
          <ProgressBarDisc
            key={particao.pontoMontagem}
            used={Number(particao.usado)}
            available={Number(particao.capacidade) - Number(particao.usado)}
          />
          <Typography marginBottom={0.5} color={'primary'} fontSize={13}>
            {(
              (Number(particao.capacidade) - Number(particao.usado)) /
              Number((1e9).toFixed(1))
            ).toFixed(1) +
              ' GB livre(s) de ' +
              (Number(particao.capacidade) / Number((1e9).toFixed(1))).toFixed(
                1
              ) +
              ' GB'}
          </Typography>
        </>
      ))}
    </Card>
  );
}

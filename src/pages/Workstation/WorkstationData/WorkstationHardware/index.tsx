import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../../../../http/requests';
import { Disco } from '../../../../types/Workstation/Disco';

type WorkstationHardwareProps = {
  assetId?: string;
};

export default function WorkstationHardware({
  assetId,
}: WorkstationHardwareProps) {
  const [disc, setDisc] = useState<Disco[]>();

  const getHardDrives = useCallback(() => {
    requestBackend({ url: `/workstation/${assetId}/hardDrives` })
      .then((response) => {
        setDisc(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [assetId]);

  useEffect(() => {
    getHardDrives();
  }, [getHardDrives]);

  return (
    <Card
      sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }}
      variant="outlined"
    >
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
      <Box padding={1}>
        {disc?.map((disco) => (
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #e9e9e9',
              borderRadius: 2,
              padding: 1.5,
            }}
          >
            <h6>
              {disco.nome + ' - ' + disco.modelo + ' - ' + disco.capacidade}
            </h6>
            {disco.particoes.map((particao) => (
              <p>{particao.pontoMontagem + ' ' + particao.capacidade}</p>
            ))}
          </Card>
        ))}
      </Box>
    </Card>
  );
}

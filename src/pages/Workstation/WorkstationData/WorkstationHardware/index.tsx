import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../../../../http/requests';
import { Disco } from '../../../../types/Workstation/Disco';
import HardDrive from './HardDrive';
import { AxiosRequestConfig } from 'axios';

type ProgressBarDiscProps = {
  assetId?: string;
};

export default function ProgressBarDisc({ assetId }: ProgressBarDiscProps) {
  const [disc, setDisc] = useState<Disco[]>();

  const getHardDrives = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/workstation/${assetId}/hardDrives`,
      withCredentials: true,
    };

    requestBackend(params)
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
        <div className="row">
          {disc?.map((disco) => (
            <div className="col-lg-6">
              <div>
                <HardDrive disco={disco} />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Card>
  );
}

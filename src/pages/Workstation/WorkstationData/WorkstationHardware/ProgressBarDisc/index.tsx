import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { ProgressBar, ProgressFill } from './style';

type ProgressBarDisc = {
  used: number;
  available: number;
};

export default function ProgressBarDisc({ used, available }: ProgressBarDisc) {
  const percentageUsed = (used / (used + available)) * 100;

  return (
    <ProgressBar>
      <ProgressFill percentage={percentageUsed}>
        <Typography color={'white'} variant="caption">
          {percentageUsed.toFixed(0) + '%'}
        </Typography>
      </ProgressFill>
    </ProgressBar>
  );
}

import React, { useState } from 'react';
import { theme } from '../../style/Theme';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Menu from '@mui/material/Menu';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { BaseCard, Field, Input, Label } from '../../style/GlobalStyles';
import StatusControl from '../../components/StatusControl/StatusControl';
import Box from '@mui/material/Box';
import UserCard from '../../components/UserCard/UserCard';

type SidePanelDataProps = {
  status?: string;
  dtUltimoSincronismo?: string;
  nome?: string;
  email?: string;
};

export default function SidePanelData({
  status,
  dtUltimoSincronismo,
  nome,
  email,
}: SidePanelDataProps) {
  return (
    <BaseCard style={{ height: '100%' }}>
      <StatusContainer >
        <div>
          <Field className="mb-2">
            <Label htmlFor="ultmSinc">Ultimo Sincronismo</Label>
            <Input value={dtUltimoSincronismo} id="ultmSinc" />
          </Field>
        </div>

        <div>
          <Title>Status</Title>
          <Status>
            <Text>{status}</Text>
            <IconButton aria-label="delete" size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Status>
        </div>
      </StatusContainer>
      <Box
        sx={{
          marginTop: 2,
          marginBottom: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      />
      <UserCard nome={nome ? nome : ' - '} email={email ? email : ' - '} />
    </BaseCard>
  );
}

const Status = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  max-width: 180px;
  border-radius: 3px;
  background: #65d59f;
  padding: 1.5px;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1190px) {
    flex-direction: row;
  }
`;


const Title = styled.h6`
  font-size: ${theme.size.sm};
  color: ${theme.colors.secondary};
  font-weight: bold;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 3px;
  font-size: 14px;
  font-weight: bold;
  color: ${theme.colors.secondary};
`;

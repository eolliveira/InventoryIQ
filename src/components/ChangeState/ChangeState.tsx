import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomModal from '../../components/CustomModal/CustomModal';
import { BaseCard, Label } from '../../style/GlobalStyles';
import { theme } from '../../style/Theme';
import { useState } from 'react';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { requestBackend } from '../../http/requests';
import { AxiosRequestConfig } from 'axios';
import Typography from '@material-ui/core/Typography';

type ChangeStateProps = {
  assetId?: number;
  oldState?: string;
  openForm: boolean;
  closeForm: () => void;
};

const assetTypes = [
  {
    desc: 'Em uso',
    value: 'EM_USO',
  },
  {
    desc: 'Em reparo',
    value: 'EM_REPARO',
  },

  {
    desc: 'Disponível',
    value: 'DISPONIVEL',
  },

  {
    desc: 'Inativo',
    value: 'INATIVO',
  },
  {
    desc: 'Descartado',
    value: 'DESCARTADO',
  },
];

export default function ChangeState({
  oldState,
  assetId,
  openForm,
  closeForm,
}: ChangeStateProps) {
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const onSave = () => {
    const data = {
      statusAtivo: oldState,
      descricao: description,
      ativo: {
          id: assetId
      },
      usuario: {
          id: 6566
      }
  }


    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/movement',
      data
    };

    requestBackend(params)
      .then((response) => {
        window.alert('Status do ativo foi alterado com sucesso!');
        closeForm();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };

  const onCancel = () => {
    console.log('cancelou modal ');
    closeForm();
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Box padding={2} sx={{ minWidth: 100 }}>
          <Typography variant="h6">Alterar Status</Typography>
          <FormControl sx={{ marginTop: 3 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              required
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="Status"
              onChange={handleChange}
            >
              {assetTypes.map((type) => (
                <MenuItem value={type.value}>{type.desc}</MenuItem>
              ))}
            </Select>

            <Label style={{ marginTop: 10 }} htmlFor="descricao">
              Descrição
            </Label>
            <textarea
              rows={8}
              cols={50}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                padding: 5,
                borderRadius: 3,
                backgroundColor: 'unset',
                fontSize: `${theme.size.md}`,
                color: `${theme.colors.black}`,
                border: `1px solid ${theme.colors.secondary}`,
              }}
              id="descricao"
            />

            <ButtonContainer>
              <div>
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  type="submit"
                  color="success"
                  loading={false}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  sx={{marginLeft: 2}}
                  onClick={onSave}
                >
                  <span>Salvar</span>
                </LoadingButton>
              </div>
            </ButtonContainer>
          </FormControl>
        </Box>
      </BaseCard>
    </CustomModal>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

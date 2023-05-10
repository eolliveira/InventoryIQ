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
import { requestBackend } from 'http/requests';
import { AxiosRequestConfig } from 'axios';

type ChangeStateProps = {
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
  openForm,
  closeForm,
}: ChangeStateProps) {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const onSave = () => {

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/movement'
      //data: formData,
    };

    requestBackend(params)
      .then((response) => {
      
        window.alert('Status do ativo foi alterado com sucesso!');
        closeForm();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });

  }

  const onCancel = () => {
    console.log('cancelou modal ');
    closeForm();
  }

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <h1>Alterar Status</h1>

        <Box sx={{ minWidth: 100 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              {assetTypes.map((type) => (
                <MenuItem value={type.value}>{type.desc}</MenuItem>
              ))}
            </Select>

            <Label htmlFor="observacao">Descrição</Label>
            <textarea
              rows={8}
              cols={50}
              style={{
                padding: 5,
                borderRadius: 3,
                backgroundColor: 'unset',
                fontSize: `${theme.size.sm}`,
                color: `${theme.colors.black}`,
                border: `1px solid ${theme.colors.secondary}`,
              }}
              id="observacao"
            />

            <ButtonContainer>
              <div>
                <Button
                  style={{
                    color: 'white',
                    marginRight: '10px',
                    backgroundColor: '#e66d6d',
                    textTransform: 'none',
                  }}
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  type="submit"
                  color="inherit"
                  loading={false}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  sx={{ color: '#64D49E' }}
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

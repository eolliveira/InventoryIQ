import { BaseCard, Label } from '../../style/GlobalStyles';
import { theme } from '../../style/Theme';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { requestBackend } from '../../http/requests';
import { FormContext } from '../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import { ButtonContainer, TextButton }  from './ChangeStateModal.style'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomModal from '../CustomModal/CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@material-ui/core/Typography';

type ChangeStateProps = {
  assetId?: string;
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

export default function ChangeStateModal({ assetId, openForm, closeForm }: ChangeStateProps) {

  const { setFormContextData } = useContext(FormContext);
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  function handleSave() {
    const data = {
      statusAtivo: state,
      descricao: description,
      ativoId: assetId,
      //deve obter o id do usuário logado
      usuarioId: 6566,
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/movement',
      data: data,
      withCredentials: false,
    };

    requestBackend(params)
      .then(() => {
        window.alert('Status do ativo foi alterado com sucesso!');
        setFormContextData({ isEditing: false });
        closeForm();
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  function handleCancel() {
    setFormContextData({ isEditing: false });
    closeForm();
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Box sx={{ minWidth: 100, padding: 2 }}>
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
              onChange={e => setState(e.target.value as string)}
            >
              {assetTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>{type.desc}</MenuItem>
              ))}
            </Select>

            <Label style={{ marginTop: 10 }} htmlFor="observacao">
              Descrição
            </Label>
            <textarea
              rows={8}
              cols={50}
              id="observacao"
              required
              onChange={e => setDescription(e.target.value)}
              style={{
                padding: 5,
                borderRadius: 3,
                backgroundColor: 'unset',
                fontSize: `${theme.size.md}`,
                color: `${theme.colors.black}`,
                border: `1px solid ${theme.colors.secondary}`,
              }}
            />
            <ButtonContainer>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
              >
                <TextButton>Cancelar</TextButton>
              </Button>
              <LoadingButton
                color="success"
                loading={false}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSave}
                style={{ marginLeft: 10 }}
              >
                <TextButton>Salvar</TextButton>
              </LoadingButton>
            </ButtonContainer>
          </FormControl>
        </Box>
      </BaseCard>
    </CustomModal>
  );
}

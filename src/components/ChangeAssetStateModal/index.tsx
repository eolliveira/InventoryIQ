import { BaseCard, Label } from '../../style/GlobalStyles';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { requestBackend } from '../../http/requests';
import { FormContext } from '../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomModal from '../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { assetState } from '../../constants/AssetState';
import Divider from '@mui/material/Divider';
import InputMultiline from '../../components/inputs/InputMultiline';

type ChangeStateProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

export default function ChangeStateModal({
  assetId,
  openModal,
  closeModal,
}: ChangeStateProps) {
  const { setFormContextData } = useContext(FormContext);
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  function handleSave() {
    const data = {
      statusAtivo: state,
      descricao: description,
      ativoId: assetId,
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
        closeModal();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Box>
          <Typography variant="subtitle1">Alterar Status</Typography>
          <Divider color="gray" />

          <FormControl sx={{ marginTop: 3 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>

            <Select
              size="small"
              labelId="demo-simple-select-label"
              label="status"
              id="demo-simple-select"
              value={state}
              onChange={(e) => setState(e.target.value as string)}
            >
              {assetState.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.desc}
                </MenuItem>
              ))}
            </Select>

            <TextField
              style={{ width: 350 }}
              margin={'normal'}
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              size="small"
              rows={6}
              required
              onChange={(e) => setDescription(e.target.value)}
            />

            <Box display={'flex'} justifyContent={'end'}>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
              >
                <Typography textTransform={'none'}>Cancelar</Typography>
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
                <Typography textTransform={'none'}>Salvar</Typography>
              </LoadingButton>
            </Box>
          </FormControl>
        </Box>
      </BaseCard>
    </CustomModal>
  );
}

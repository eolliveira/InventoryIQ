import { BaseCard } from '../../../style/GlobalStyles';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import CustomModal from '../../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { assetStatus } from '../../../constants/AssetStatus';
import Panel from '../../../components/Panel';
import Swal from 'sweetalert2';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { removeUnderline, toCamelCase } from '../../../utils/StringConverter';
import { AuthContext } from '../../../contexts/AuthContext';

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
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const { setFormContextData } = useContext(FormContext);
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  function handleSave() {
    if (state == '') {
      Swal.fire({
        title: 'Atenção!',
        text: 'Informe um status!',
        icon: 'warning',
        confirmButtonColor: '#999999',
      });
      return;
    }

    if (description == '') {
      Swal.fire({
        title: 'Atenção!',
        text: 'Descreva o motivo para a mudança do status!',
        icon: 'warning',
        confirmButtonColor: '#999999',
      });
      return;
    }

    const data = {
      statusAtivo: state,
      descricao: description,
      ativoId: assetId,
      usuarioId: authContextData.tokenData?.userId,
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/movement',
      data,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Status do ativo foi alterado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#999999',
        });

        setFormContextData({ isEditing: false });
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Atenção',
          text: error.response.data.message,
          icon: 'warning',
          confirmButtonColor: '#999999',
        });
      });
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Alterar Status">
          <FormControl>
            <InputLabel size="small" id="demo-simple-select-label">
              Status
            </InputLabel>
            <Select
              required
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="Statu"
              onChange={(e) => setState(String(e.target.value))}
            >
              {assetStatus.map((status) => (
                <MenuItem value={status}>
                  {toCamelCase(removeUnderline(status))}
                </MenuItem>
              ))}
            </Select>

            <TextField
              required
              style={{ width: 350, marginBottom: 22 }}
              margin={'normal'}
              label="Motivo"
              multiline
              size="small"
              rows={6}
              value={description}
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
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormContext } from '../../../contexts/FormContext';
import Swal from 'sweetalert2';
import { requestBackend } from '../../../http/requests';
import CustomModal from '../../CustomModal';
import { BaseCard } from '../../../style/GlobalStyles';
import Panel from '../../Panel';

type InterfaceFormProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

export default function InterfaceForm({ assetId, openModal, closeModal }: InterfaceFormProps) {
  const { setFormContextData } = useContext(FormContext);
  const [enderecoIp, setEnderecoIp] = useState('');
  const [enderecoMac, setEnderecoMac] = useState('');

  const handleSave = () => {
    if (enderecoIp == '') {
      Swal.fire({ title: 'Atenção!', text: 'Informe um endereço ip!', icon: 'warning' });
      return;
    }

    const data = {
      enderecoIp: enderecoIp,
      enderecoMac: enderecoMac,
      ativo_id: assetId,
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/interface',
      data: data,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({ title: 'Sucesso!', text: 'Interface foi adicionada com sucesso!', icon: 'success' });
        setFormContextData({ isEditing: false });
        closeModal();
      })
      .catch((error) => Swal.fire({ title: 'Atenção', text: error.response.data.message, icon: 'warning' }));
  };

  const handleCancel = () => closeModal();

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Adicionar Interface">
          <FormControl>
            <TextField
              required
              style={{ width: 350, marginBottom: 10 }}
              label="Endereço Ip"
              placeholder="0.0.0.0"
              size="small"
              value={enderecoIp}
              onChange={(e) => setEnderecoIp(e.target.value)}
            />
            <TextField
              style={{ width: 350, marginBottom: 10 }}
              label="Endereço Mac"
              placeholder="00:00:00:00:00:00"
              size="small"
              value={enderecoMac}
              onChange={(e) => setEnderecoMac(e.target.value)}
            />
            <Box display={'flex'} justifyContent={'end'}>
              <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={handleCancel}>
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

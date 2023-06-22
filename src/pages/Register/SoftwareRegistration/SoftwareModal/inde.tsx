import { useState } from 'react';
import { Button } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { requestBackend } from '../../../../http/requests';
import CustomModal from '../../../../components/CustomModal';
import { BaseCard } from '../../../../style/GlobalStyles';
import Panel from '../../../../components/Panel';

type SoftwareModalProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

export default function SoftwareModal({
  assetId,
  openModal,
  closeModal,
}: SoftwareModalProps) {
  //const { setFormContextData } = useContext(FormContext);
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  function handleSave() {
    const data = {
      statusAtivo: state,
      descricao: description,
      ativoId: assetId,
      //alterar para usuçário logado
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
        Swal.fire({
          title: 'Sucesso!',
          text: 'Status do ativo foi alterado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#999999',
        });

        //setFormContextData({ isEditing: false });
        closeModal();
      })
      .catch((error: any) => {
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
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

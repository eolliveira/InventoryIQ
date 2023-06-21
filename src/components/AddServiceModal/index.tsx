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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { typeOfService } from '../../constants/TypeOfService';
import Swal from 'sweetalert2';
import Panel from '../../components/Panel';
import InputSelect from '../../components/inputs/InputSelect';

type AddServiceModalProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

export default function AddServiceModal({
  assetId,
  openModal,
  closeModal,
}: AddServiceModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  function handleSave() {
    const data = {
      tipoServico: state,
      descricao: description,
      vlServico: value,
      ativoId: assetId,
      usuarioId: 6566,
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/services',
      data: data,
      withCredentials: false,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Registro foi salvo com sucesso!.',
          icon: 'success',
          confirmButtonColor: '#999999',
        });
        setFormContextData({ isAdding: false });
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erro!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonColor: '#999999',
        });

        closeModal();
      });
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Adicionar Serviço">
          <FormControl>
            <InputSelect
              label="Tipo"
              inputField={state}
              setInputField={setState}
              selectedItems={typeOfService.map((type) => type.value)}
            />

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

            <TextField
              style={{ width: 350 }}
              type="number"
              margin={'normal'}
              id="outlined-multiline-staticc"
              label="Valor do serviço"
              multiline
              size="small"
              onChange={(e) => setValue(Number(e.target.value))}
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

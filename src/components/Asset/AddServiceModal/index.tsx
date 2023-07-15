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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { typeOfService } from '../../../constants/TypeOfService';
import Swal from 'sweetalert2';
import Panel from '../../Panel';
import InputSelect from '../../inputs/InputSelect';
import { AuthContext } from '../../../contexts/AuthContext';

type AddServiceModalProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

export default function AddServiceModal({ assetId, openModal, closeModal }: AddServiceModalProps) {
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const { setFormContextData } = useContext(FormContext);
  const [typeService, setTypeService] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  function handleSave() {
    if (typeService == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione o tipo do serviço!',
        icon: 'warning',
      });
      return;
    }
    if (description == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Informe uma descrição para o serviço!',
        icon: 'warning',
      });
      return;
    }

    const data = {
      tipoServico: typeService,
      descricao: description,
      vlServico: value,
      ativoId: assetId,
      usuarioId: authContextData.tokenData?.userId,
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/services',
      data: data,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Registro foi salvo com sucesso!.',
          icon: 'success',
        });
        setFormContextData({ isAdding: false });
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erro!',
          text: `${error.response.data.message}`,
          icon: 'error',
        });

        closeModal();
      });
  }

  const handleCancel = () => closeModal();

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Adicionar Serviço">
          <FormControl>
            <InputSelect
              required
              label="Tipo"
              inputField={typeService}
              setInputField={setTypeService}
              selectedItems={typeOfService.map((type) => type.value)}
            />

            <TextField
              style={{ width: 350 }}
              margin={'normal'}
              label="Descrição"
              multiline
              size="small"
              rows={6}
              value={description}
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

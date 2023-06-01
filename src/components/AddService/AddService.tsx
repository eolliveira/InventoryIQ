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
import CustomModal from '../CustomModal/CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { typeOfService } from '../../constants/TypeOfService';

type ChangeStateProps = {
  assetId?: string;
  openForm: boolean;
  closeForm: () => void;
};

export default function AddService({
  assetId,
  openForm,
  closeForm,
}: ChangeStateProps) {
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
        window.alert('Status do ativo foi alterado com sucesso!');
        setFormContextData({ isAdding: false });
        closeForm();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }

  function handleCancel() {
    closeForm();
  }

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Box sx={{ minWidth: 100, padding: 2 }}>
          <Typography variant="h6">Tipo Serviço</Typography>

          <FormControl sx={{ marginTop: 3 }}>
            <InputLabel id="demo-simple-select-label">Tipo serviço</InputLabel>

            <Select
              size="medium"
              labelId="demo-simple-select-label"
              label="status"
              id="demo-simple-select"
              value={state}
              onChange={(e) => setState(e.target.value as string)}
            >
              {typeOfService.map((type) => (
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

            <Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
              >
                <Typography>Cancelar</Typography>
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
                <span>Salvar</span>
              </LoadingButton>
            </Box>
          </FormControl>
        </Box>
      </BaseCard>
    </CustomModal>
  );
}

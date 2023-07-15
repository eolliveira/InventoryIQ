import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { requestBackend } from '../../../../http/requests';
import CustomModal from '../../../../components/CustomModal';
import { BaseCard } from '../../../../style/GlobalStyles';
import Panel from '../../../../components/Panel';
import { Software } from '../../../../types/Licenca/Software';
import { FormContext } from '../../../../contexts/FormContext';
import { useForm } from 'react-hook-form';
import InputText from '../../../../components/inputs/InputText';
import { FormControlCustom } from './style';

type SoftwareModalProps = {
  data?: Software;
  openModal: boolean;
  closeModal: () => void;
};

export default function SoftwareModal({ data: software, openModal, closeModal }: SoftwareModalProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Software>();

  useState(() => {
    if (formContextData.isEditing == true) {
      setValue('nome', software?.nome ?? '');
      setValue('fabricante', software?.fabricante ?? '');
    }
  });

  const onSubmit = (formData: Software) => {
    const params: AxiosRequestConfig = {
      method: formContextData.isEditing ? 'PUT' : 'POST',
      url: formContextData.isEditing ? `/software/${software?.id}` : '/software',
      data: formData,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Dados foram salvos!',
          icon: 'success',
        });
        setFormContextData({
          isAdding: false,
          isEditing: false,
          isDuplicated: false,
        });

        closeModal();
      })
      .catch((error: any) => {
        Swal.fire({
          title: 'Atenção',
          text: error.response.data.message,
          icon: 'warning',
        });
      });
  };

  const handleCancel = () => {
    setFormContextData({
      isAdding: false,
      isEditing: false,
      isDuplicated: false,
    });
    closeModal();
  };

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title={formContextData.isAdding ? 'Adicionar software' : 'Alterar software'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControlCustom>
              <InputText
                required
                label="Nome"
                name="nome"
                control={control}
                register={register}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
              <InputText
                label="Fabricante"
                name="fabricante"
                control={control}
                register={register}
                error={!!errors.fabricante}
                helperText={errors.fabricante?.message}
              />
              <Box display={'flex'} justifyContent={'end'} marginTop={1}>
                <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={handleCancel}>
                  <Typography textTransform={'none'}>Cancelar</Typography>
                </Button>
                <LoadingButton
                  color="success"
                  loading={false}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  type="submit"
                  style={{ marginLeft: 10 }}
                >
                  <Typography textTransform={'none'}>Salvar</Typography>
                </LoadingButton>
              </Box>
            </FormControlCustom>
          </form>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

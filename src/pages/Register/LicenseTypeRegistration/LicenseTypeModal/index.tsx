import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { requestBackend } from '../../../../http/requests';
import CustomModal from '../../../../components/CustomModal';
import { BaseCard } from '../../../../style/GlobalStyles';
import Panel from '../../../../components/Panel';
import { FormContext } from '../../../../contexts/FormContext';
import { useForm } from 'react-hook-form';
import InputText from '../../../../components/inputs/InputText';
import { TipoLicenca } from '../../../../types/Licenca/TipoLicenca';

type LicenseTypeModalProps = {
  data?: TipoLicenca;
  openModal: boolean;
  closeModal: () => void;
};

export default function LicenseTypeModal({
  data,
  openModal,
  closeModal,
}: LicenseTypeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<TipoLicenca>();

  const { formContextData, setFormContextData } = useContext(FormContext);

  useState(() => {
    if (formContextData.isEditing == true) {
      setValue('nome', data?.nome ?? '');
      setValue('descricao', data?.descricao ?? '');
    }
  });

  function onSubmit(formData: TipoLicenca) {
    const params: AxiosRequestConfig = {
      method: formContextData.isEditing ? 'PUT' : 'POST',
      url: formContextData.isEditing
        ? `/licenseType/${data?.id}`
        : '/licenseType',
      data: formData,
      withCredentials: false,
    };

    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Dados foram salvos!',
          icon: 'success',
          confirmButtonColor: '#999999',
        });

        setFormContextData({ isAdding: false });
        setFormContextData({ isEditing: false });
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
    setFormContextData({ isAdding: false, isEditing: false });
    closeModal();
  }

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Tipo de Licença">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
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
                label="Descrição"
                name="descricao"
                control={control}
                register={register}
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
              />
              <Box display={'flex'} justifyContent={'end'} marginTop={1}>
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
                  type="submit"
                  style={{ marginLeft: 10 }}
                >
                  <Typography textTransform={'none'}>Salvar</Typography>
                </LoadingButton>
              </Box>
            </FormControl>
          </form>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

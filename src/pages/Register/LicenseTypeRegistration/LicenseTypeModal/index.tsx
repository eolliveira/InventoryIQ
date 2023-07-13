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
import { FormContext } from '../../../../contexts/FormContext';
import { useForm } from 'react-hook-form';
import InputText from '../../../../components/inputs/InputText';
import { TipoLicenca } from '../../../../types/Licenca/TipoLicenca';
import InputMultiline from '../../../../components/inputs/InputMultiline';
import { FormControlCustom } from './style';

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
  }

  function handleCancel() {
    setFormContextData({
      isAdding: false,
      isEditing: false,
      isDuplicated: false,
    });
    closeModal();
  }

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Box>
          <Panel
            title={
              formContextData.isAdding
                ? 'Adicionar tipo de licença'
                : 'Alterar tipo de licença'
            }
          >
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

                <InputMultiline
                  label="Descrição"
                  name="descricao"
                  rows={5}
                  control={control}
                  register={register}
                  error={!!errors.descricao}
                  helperText={errors.descricao?.message}
                />
                <Box display={'flex'} justifyContent={'end'} marginTop={2}>
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
              </FormControlCustom>
            </form>
          </Panel>
        </Box>
      </BaseCard>
    </CustomModal>
  );
}

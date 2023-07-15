import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import { useContext, useState } from 'react';
import { FormControlCustom } from './style';
import { BaseCard } from '../../../../style/GlobalStyles';
import { requestBackend } from '../../../../http/requests';
import { FormContext } from '../../../../contexts/FormContext';
import { TipoLicenca } from '../../../../types/Licenca/TipoLicenca';

import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import Panel from '../../../../components/Panel';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomModal from '../../../../components/CustomModal';
import InputText from '../../../../components/inputs/InputText';
import InputMultiline from '../../../../components/inputs/InputMultiline';

type LicenseTypeModalProps = {
  data?: TipoLicenca;
  openModal: boolean;
  closeModal: () => void;
};

export default function LicenseTypeModal({ data, openModal, closeModal }: LicenseTypeModalProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<TipoLicenca>();

  useState(() => {
    if (formContextData.isEditing == true) {
      setValue('nome', data?.nome ?? '');
      setValue('descricao', data?.descricao ?? '');
    }
  });

  const onSubmit = (formData: TipoLicenca) => {
    const params: AxiosRequestConfig = {
      method: formContextData.isEditing ? 'PUT' : 'POST',
      url: formContextData.isEditing ? `/licenseType/${data?.id}` : '/licenseType',
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
        <Box>
          <Panel title={formContextData.isAdding ? 'Adicionar tipo de licença' : 'Alterar tipo de licença'}>
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
        </Box>
      </BaseCard>
    </CustomModal>
  );
}

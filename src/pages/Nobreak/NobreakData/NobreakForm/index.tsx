import Box from '@mui/material/Box';
import { BaseCard } from '../../../../style/GlobalStyles';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import { useNavigate } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../../http/requests';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CustomModal from '../../../../components/CustomModal';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import InputDate from '../../../../components/inputs/InputDate';
import InputText from '../../../../components/inputs/InputText';
import InputCurrency from '../../../../components/inputs/InputCurrency';
import InputMultiline from '../../../../components/inputs/InputMultiline';
import Swal from 'sweetalert2';
import Panel from '../../../../components/Panel';
import Stack from '@mui/material/Stack';
import { Nobreak } from '../../../../types/Nobreak';

type NobreakFormProps = {
  data?: Nobreak;
  openForm: boolean;
  closeForm: () => void;
};

export default function NobreakForm({
  data,
  openForm,
  closeForm,
}: NobreakFormProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Nobreak>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && formContextData.isEditing) setFormData(data);
  }, []);

  const onSubmit = (formData: Nobreak) => {
    Swal.fire({
      title: 'Salvar dados?',
      text: 'Deseja salvar os dados do ativo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#43a047',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: formContextData.isAdding ? 'POST' : 'PUT',
          url: formContextData.isAdding
            ? '/nobreak'
            : `/nobreak/${data?.id}/update`,
          data: formData,
        };

        requestBackend(params)
          .then((response) => {
            Swal.fire({
              title: 'Concluido!',
              text: 'Dados foram salvos!',
              icon: 'success',
              confirmButtonColor: '#999999',
            });
            setFormContextData({
              isAdding: false,
              isEditing: false,
            });
            navigate(`/nobreak/${response.data.id}`);
            closeForm();
          })
          .catch((error) => {
            Swal.fire({
              title: 'Atenção',
              text: `${error.response.data.message}`,
              icon: 'warning',
              confirmButtonColor: '#999999',
            });
          });
      }
    });
  };

  const onCancelForm = () => {
    setFormContextData({
      isAdding: false,
      isEditing: false,
    });

    closeForm();
  };

  const setFormData = (data: Nobreak) => {
    setValue('nome', data.nome);
    setValue('modelo', data.modelo);
    setValue('fabricante', data.fabricante);
    setValue('observacao', data.observacao);
    setValue('dtAquisicao', data.dtAquisicao);
    setValue('potencialNominal', data.potencialNominal);
    setValue('tensaoEntrada', data.tensaoEntrada);
    setValue('tensaoSaida', data.tensaoSaida);
    setValue('numeroSerie', data.numeroSerie);
    setValue('vlrAquisicao', data.vlrAquisicao);
    setValue('dtVencimentoGarantia', data.dtVencimentoGarantia);
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel
          title={
            formContextData.isEditing ? 'Alterar Nobreak' : 'Adicionar Nobreak'
          }
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
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
                  label="Modelo"
                  name="modelo"
                  control={control}
                  register={register}
                  error={!!errors.modelo}
                  helperText={errors.modelo?.message}
                />

                <InputText
                  label="Fabricante"
                  name="fabricante"
                  control={control}
                  register={register}
                  error={!!errors.fabricante}
                  helperText={errors.fabricante?.message}
                />

                <InputMultiline
                  control={control}
                  name="observacao"
                  register={register}
                  label="Observação"
                  rows={4}
                  error={!!errors.observacao}
                  helperText={errors.observacao?.message}
                />
              </div>
              <div className="col-md-6">
                <InputText
                  label="Numero de série"
                  name="numeroSerie"
                  control={control}
                  register={register}
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />

                <InputText
                  label="Potência nominal"
                  name="potencialNominal"
                  control={control}
                  register={register}
                  error={!!errors.potencialNominal}
                  helperText={errors.potencialNominal?.message}
                />

                <div className="row">
                  <div className="col-lg-6">
                    <InputText
                      label="Tensão Entrada"
                      name="tensaoEntrada"
                      control={control}
                      register={register}
                      error={!!errors.tensaoEntrada}
                      helperText={errors.tensaoEntrada?.message}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputText
                      label="Tensão Saida"
                      name="tensaoSaida"
                      control={control}
                      register={register}
                      error={!!errors.tensaoSaida}
                      helperText={errors.tensaoSaida?.message}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <InputDate
                      register={register}
                      label="Data aquisição"
                      control={control}
                      name="dtAquisicao"
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputDate
                      register={register}
                      name="dtVencimentoGarantia"
                      label="Data venc.Garantia"
                      control={control}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <InputCurrency
                      label="Valor compra"
                      name="vlrAquisicao"
                      control={control}
                      register={register}
                      error={!!errors.vlrAquisicao}
                      helperText={errors.vlrAquisicao?.message}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Box display={'flex'} justifyContent={'end'} marginTop={2}>
              <Stack direction={'row'} spacing={2}>
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={onCancelForm}
                >
                  <Typography fontSize={14} textTransform={'none'}>
                    Cancelar
                  </Typography>
                </Button>
                <LoadingButton
                  type="submit"
                  color="success"
                  loading={false}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <Typography fontSize={14} textTransform={'none'}>
                    Salvar
                  </Typography>
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

const Form = styled.form`
  @media (min-width: 400px) {
    width: 380px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }

  @media (min-width: 720px) {
    width: 620px;
  }

  @media (min-width: 750px) {
    width: 700px;
  }

  @media (min-width: 900px) {
    width: 850px;
  }
`;

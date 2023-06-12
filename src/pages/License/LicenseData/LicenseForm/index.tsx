import Box from '@mui/material/Box';
import { BaseCard } from '../../../../style/GlobalStyles';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCallback, useContext, useEffect, useState } from 'react';
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

import { Dayjs } from 'dayjs';
import InputDate from '../../../../components/inputs/InputDate';
import InputText from '../../../../components/inputs/InputText';
import InputCurrency from '../../../../components/inputs/InputCurrency';
import InputMultiline from '../../../../components/inputs/InputMultiline';
import Swal from 'sweetalert2';
import Panel from '../../../../components/Panel';
import Stack from '@mui/material/Stack';
import { Licenca } from '../../../../types/Licenca/Licenca';
import InputSelect from '../../../../components/inputs/InputSelect';
import { Software } from '../../../../types/Licenca/Software';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TipoLicenca } from '../../../../types/Licenca/TipoLicenca';

type LicenseFormProps = {
  licenseData?: Licenca;
  openForm: boolean;
  closeForm: () => void;
};

export default function LicenseForm({
  licenseData,
  openForm,
  closeForm,
}: LicenseFormProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [licenseType, setLicenseType] = useState<TipoLicenca[]>();
  const [software, setSoftware] = useState<Software[]>();
  const [licenseTypeId, setLicenseTypeId] = useState<any>();
  const [softwareId, setSoftwareId] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Licenca>();
  const navigate = useNavigate();

  const getLicenseType = useCallback(() => {
    requestBackend({ url: '/licenseType' })
      .then((response) => {
        setLicenseType(response.data);
      })
      .catch((error) => {
        console.log('falha ao carregar os tipos de software' + error);
      });
  }, [formContextData]);

  const getSoftwares = useCallback(() => {
    requestBackend({ url: '/software' })
      .then((response) => {
        setSoftware(response.data);
      })
      .catch((error) => {
        console.log('falha ao carregar softarwares' + error);
      });
  }, [formContextData]);

  useEffect(() => {
    getSoftwares();
    getLicenseType();
    if (licenseData && formContextData.isEditing) {
      setFormData(licenseData);
    }
  }, [getSoftwares, getLicenseType]);

  const onSubmit = (formData: Licenca) => {
    Swal.fire({
      title: 'Salvar dados?',
      text: 'Deseja salvar os dados da Licença?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#43a047',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const dataT = {
          ...formData,
          softwareId: softwareId,
          tpLicencaId: licenseTypeId,
        };

        const params: AxiosRequestConfig = {
          method: formContextData.isAdding ? 'POST' : 'PUT',
          url: formContextData.isAdding
            ? '/licenses'
            : `/licenses/${licenseData?.id}/update`,
          data: dataT,
        };

        requestBackend(params)
          .then((response) => {
            Swal.fire('Concluido!', 'Dados foram salvos!', 'success');
            setFormContextData({
              isAdding: false,
              isEditing: false,
            });
            navigate(`/license/${response.data.id}`);
            closeForm();
          })
          .catch((error) => {
            window.alert(error.response.data.message);
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

  const setFormData = (data: Licenca) => {
    setValue('nome', data.nome);
    setValue('qtdAdquirida', data.qtdAdquirida);
    setValue('qtdAlocada', data.qtdAlocada);
    setValue('chave', data.chave);
    setValue('status', data.status);
    setValue('numeroSerie', data.numeroSerie);
    setValue('dtAquisicao', data.dtAquisicao);
    setValue('dtExpiracao', data.dtExpiracao);
    setValue('vlrAquisicao', data.vlrAquisicao);
    setValue('software', data.software);
    setValue('tpLicenca', data.tpLicenca);
    setSoftwareId(data.software.id);
    setLicenseTypeId(data.tpLicenca.id);
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title="Adicionando Licença">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6">
                <InputText
                  required
                  label="Nome"
                  name="nome"
                  control={control}
                  register={register}
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Selecione um software</InputLabel>
                  <Select
                    label="Selecione um software"
                    value={softwareId}
                    onChange={(e: any) => {
                      setSoftwareId(e.target.value);
                    }}
                  >
                    {software?.map((software) => (
                      <MenuItem key={software.id} value={software.id}>
                        {software.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Selecione tipo da licença</InputLabel>
                  <Select
                    label="Selecione tipo da licença"
                    value={licenseTypeId}
                    onChange={(e: any) => {
                      setLicenseTypeId(e.target.value);
                    }}
                  >
                    {licenseType?.map((licenseType) => (
                      <MenuItem key={licenseType.id} value={licenseType.id}>
                        {licenseType.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <InputText
                  label="Chave"
                  name="chave"
                  control={control}
                  register={register}
                  error={!!errors.chave}
                  helperText={errors.chave?.message}
                />
                <div className="row">
                  <div className="col-lg-6">
                    <InputText
                      label="Quantidade alocada"
                      name="qtdAlocada"
                      control={control}
                      register={register}
                      error={!!errors.qtdAlocada}
                      helperText={errors.qtdAlocada?.message}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputText
                      label="Qtd.Adquirida"
                      name="qtdAdquirida"
                      control={control}
                      register={register}
                      error={!!errors.qtdAdquirida}
                      helperText={errors.qtdAdquirida?.message}
                    />
                  </div>
                </div>
                <InputText
                  label="numeroSerie"
                  name="numeroSerie"
                  control={control}
                  register={register}
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />
                <div className="row">
                  <div className="col-lg-6"></div>
                  <div className="col-lg-6"></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-9"></div>
                  <div className="col-lg-3"></div>
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
                      name="dtExpiracao"
                      label="Data Expiracao"
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

            <Box display={'flex'} justifyContent={'end'} marginTop={3}>
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
          </form>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

const Container = styled.div`
  @media (min-width: 992px) {
    width: 800px;
  }

  @media (min-width: 1240px) {
    width: 1000px;
  }
`;

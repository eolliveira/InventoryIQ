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
import Typography from '@mui/material/Typography';
import InputDate from '../../../../components/inputs/InputDate';
import InputText from '../../../../components/inputs/InputText';
import InputCurrency from '../../../../components/inputs/InputCurrency';
import Swal from 'sweetalert2';
import Panel from '../../../../components/Panel';
import Stack from '@mui/material/Stack';
import { Licenca } from '../../../../types/Licenca/Licenca';
import { Software } from '../../../../types/Licenca/Software';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TipoLicenca } from '../../../../types/Licenca/TipoLicenca';
import { licenseStatus } from '../../../../constants/LicenseStatus';
import { removeUnderline, toCamelCase } from '../../../../utils/StringConverter';
import InputNumber from '../../../../components/inputs/InputNumber';
import InputMultiline from '../../../../components/inputs/InputMultiline';

type LicenseFormProps = {
  licenseData?: Licenca;
  openForm: boolean;
  closeForm: () => void;
};

export default function LicenseForm({ licenseData, openForm, closeForm }: LicenseFormProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [licenseTypes, setLicenseType] = useState<TipoLicenca[]>();
  const [softwares, setSoftware] = useState<Software[]>();
  const [status, setStatus] = useState('');
  const [tpLicencaId, setTpLicencaId] = useState('');
  const [softwareId, setSoftwareId] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Licenca>();

  const getLicenseType = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/licenseType',
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setLicenseType(response.data))
      .catch((error) => console.log('falha ao carregar os tipos de software' + error));
  }, []);

  const getSoftwares = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/software',
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setSoftware(response.data))
      .catch((error) => console.log('falha ao carregar softwares' + error));
  }, []);

  useEffect(() => {
    getLicenseType();
    getSoftwares();

    if (licenseData && formContextData.isEditing) {
      setFormData(licenseData);
      setStatus(licenseData.status);
      setSoftwareId(licenseData.software.id);
      setTpLicencaId(licenseData.tpLicenca.id);
    }
  }, [getLicenseType, getSoftwares, licenseData]);

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
    setValue('observacao', data.observacao);
    setValue('software', data.software);
    setValue('tpLicenca', data.tpLicenca);
  };

  const onSubmit = (formData: Licenca) => {
    Swal.fire({
      title: 'Salvar dados?',
      text: 'Deseja salvar os dados da Licença?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          ...formData,
          status,
          softwareId,
          tpLicencaId,
        };

        const params: AxiosRequestConfig = {
          method: formContextData.isAdding ? 'POST' : 'PUT',
          url: formContextData.isAdding ? '/licenses' : `/licenses/${licenseData?.id}/update`,
          data,
          withCredentials: true,
        };

        requestBackend(params)
          .then((response) => {
            Swal.fire({
              title: 'Concluido',
              text: 'Dados foram salvos!',
              icon: 'success',
            });
            setFormContextData({
              isAdding: false,
              isEditing: false,
              isDuplicated: false,
            });
            navigate(`/license/${response.data.id}`);
            closeForm();
          })
          .catch((error) => {
            Swal.fire({
              title: 'Atenção',
              text: error.response.data.message,
              icon: 'warning',
            });
          });
      }
    });
  };

  const onCancelForm = () => {
    setFormContextData({
      isAdding: false,
      isEditing: false,
      isDuplicated: false,
    });
    closeForm();
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title={formContextData.isEditing ? 'Alterar licença' : 'Adicionar licença'}>
          <form style={{ maxWidth: `900px` }} onSubmit={handleSubmit(onSubmit)}>
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
                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel sx={{ fontSize: 14 }}>Selecione um software</InputLabel>
                  <Select
                    required
                    label="Selecione um software"
                    value={softwareId}
                    sx={{ fontSize: 13 }}
                    onChange={(e) => setSoftwareId(e.target.value)}
                  >
                    {softwares?.map((software) => (
                      <MenuItem sx={{ fontSize: 13 }} key={software.id} value={software.id}>
                        {software.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" margin={'dense'}>
                  <InputLabel sx={{ fontSize: 14 }}>Tipo da licença</InputLabel>
                  <Select
                    required
                    label="Tipo da licença"
                    value={tpLicencaId}
                    sx={{ fontSize: 13 }}
                    onChange={(e) => setTpLicencaId(e.target.value)}
                  >
                    {licenseTypes?.map((licenseType) => (
                      <MenuItem sx={{ fontSize: 13 }} key={licenseType.id} value={licenseType.id}>
                        {licenseType.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <InputText
                  required
                  label="Chave"
                  name="chave"
                  control={control}
                  register={register}
                  error={!!errors.chave}
                  helperText={errors.chave?.message}
                />
                <div className="row">
                  <div className="col-lg-12">
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
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12">
                    {formContextData.isEditing && (
                      <FormControl fullWidth size="small" margin={'dense'}>
                        <InputLabel sx={{ fontSize: 14 }}>Status</InputLabel>
                        <Select
                          required
                          label="Status"
                          value={status}
                          sx={{ fontSize: 13 }}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {licenseStatus?.map((status) => (
                            <MenuItem sx={{ fontSize: 13 }} key={status} value={status}>
                              {toCamelCase(removeUnderline(status))}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <InputText
                      label="numeroSerie"
                      name="numeroSerie"
                      control={control}
                      register={register}
                      error={!!errors.numeroSerie}
                      helperText={errors.numeroSerie?.message}
                    />
                  </div>

                  <div className="col-lg-6">
                    <InputDate register={register} label="Data aquisição" control={control} name="dtAquisicao" />
                  </div>
                  <div className="col-lg-6">
                    <InputDate register={register} name="dtExpiracao" label="Data Expiracao" control={control} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <InputNumber
                      required
                      label="Qtd.Adquirida"
                      name="qtdAdquirida"
                      control={control}
                      register={register}
                      error={!!errors.qtdAdquirida}
                      helperText={errors.qtdAdquirida?.message}
                    />
                  </div>
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
                <Button color="error" variant="contained" startIcon={<CloseIcon />} onClick={onCancelForm}>
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

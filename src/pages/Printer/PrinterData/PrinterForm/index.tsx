import Box from '@mui/material/Box';
import { BaseCard } from '../../../../style/GlobalStyles';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../../contexts/FormContext';
import { useNavigate } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../../http/requests';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CustomModal from '../../../../components/CustomModal';
import SearchIcon from '@mui/icons-material/Search';
import { Interface } from 'types/Ativo/Interface';
import Typography from '@mui/material/Typography';
import NoData from '../../../../components/NoData';
import InputDate from '../../../../components/inputs/InputDate';
import InputText from '../../../../components/inputs/InputText';
import InputCurrency from '../../../../components/inputs/InputCurrency';
import InputMultiline from '../../../../components/inputs/InputMultiline';
import Swal from 'sweetalert2';
import Panel from '../../../../components/Panel';
import SearchBar from '../../../../components/SearchBar';
import Stack from '@mui/material/Stack';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Printer } from '../../../../types/Ativo/Printer/Printer';

const columns: TableColumn<Interface>[] = [
  { name: 'Fabricante', selector: (row) => row.fabricante },
  { name: 'Ip', selector: (row) => row.enderecoIp },
  { name: 'Mascara', selector: (row) => row.mascaraSubRede },
  { name: 'Mac', selector: (row) => row.enderecoMac },
];

type PrinterFormProps = {
  data?: Printer;
  openForm: boolean;
  closeForm: () => void;
};

export default function PrinterForm({ data, openForm, closeForm }: PrinterFormProps) {
  const navigate = useNavigate();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [sweeping, setSweeping] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [interfaces, setInterfaces] = useState<Interface[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Printer>();

  useEffect(() => {
    if (data && formContextData.isEditing) setFormData(data);
    if (data && formContextData.isDuplicated && formContextData.isAdding) setFormData(data);
  }, []);

  const onSubmit = (formData: Printer) => {
    Swal.fire({
      title: 'Salvar dados?',
      text: 'Deseja salvar os dados do ativo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: formContextData.isAdding ? 'POST' : 'PUT',
          url: formContextData.isAdding ? '/printer' : `/printer/${data?.id}/update`,
          data: formData,
          withCredentials: true,
        };

        requestBackend(params)
          .then((response) => {
            Swal.fire({
              title: 'Concluido!',
              text: 'Dados foram salvos!',
              icon: 'success',
            });
            setFormContextData({
              isAdding: false,
              isEditing: false,
              isDuplicated: false,
            });
            navigate(`/printer/${response.data.id}`);
            closeForm();
          })
          .catch((error) => {
            Swal.fire({
              title: 'Atenção',
              text: `${error.response.data.message}`,
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

  const handleToSweep = () => {
    setSweeping(true);

    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/printer/data/${ipAddress}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setValue('nomeHost', response.data.nomeHost);
        setValue('modelo', response.data.modelo);
        setValue('numeroSerie', response.data.numeroSerie);
        setValue('totalImpressoes', response.data.totalImpressoes);
        setValue('gateway', response.data.gateway);
        setValue('dominio', response.data.dominio);
        setValue('tempoLigado', response.data.tempoLigado);
        setValue('enderecoIp', response.data.enderecoIp);
        setValue('enderecoMac', response.data.enderecoMac);
        setValue('mascaraSubRede', response.data.mascaraSubRede);

        const interfaces: Interface = {
          id: response.data.id,
          nomeLocal: response.data.nomeLocal,
          fabricante: response.data.fabricante,
          enderecoIp: response.data.enderecoIp,
          enderecoMac: response.data.enderecoMac,
          mascaraSubRede: response.data.mascaraSubRede,
        };

        const newInterface: Interface[] = [interfaces];
        setInterfaces(newInterface);
      })
      .catch(() => {
        Swal.fire({
          title: 'Falha!',
          text: `Não foi possivel obter os dados do ativo. Por favor verifique se o endereço ip esta correto e se o agente esta configurado corretamente!`,
          icon: 'warning',
        });
      })
      .finally(() => setSweeping(false));
  };

  const setFormData = (data: Printer) => {
    formContextData.isDuplicated ? setValue('nome', '') : setValue('nome', data.nome);
    setValue('dominio', data.dominio);
    setValue('gateway', data.gateway);
    setValue('modelo', data.modelo);
    setValue('nomeHost', data.nomeHost);
    setValue('fabricante', data.fabricante);
    setValue('observacao', data.observacao);
    setValue('dtAquisicao', data.dtAquisicao);
    setValue('tempoLigado', data.tempoLigado);
    setValue('numeroSerie', data.numeroSerie);
    setValue('vlrAquisicao', data.vlrAquisicao);
    setValue('dtVencimentoGarantia', data.dtVencimentoGarantia);
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title={formContextData.isEditing ? 'Alterar impressora' : 'Adicionar impressora'}>
          {formContextData.isAdding && (
            <Box display={'flex'}>
              <SearchBar inputFilter={ipAddress} setInputFilter={setIpAddress} />

              <LoadingButton size="small" color="primary" onClick={handleToSweep} loading={sweeping} variant="text">
                <SearchIcon fontSize="medium" />
              </LoadingButton>
            </Box>
          )}
          <form style={{ maxWidth: `900px` }} onSubmit={handleSubmit(onSubmit)}>
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
                  label="Fabricante"
                  name="fabricante"
                  control={control}
                  register={register}
                  error={!!errors.fabricante}
                  helperText={errors.fabricante?.message}
                />
                <InputText
                  label="Dominio"
                  name="dominio"
                  control={control}
                  register={register}
                  error={!!errors.dominio}
                  helperText={errors.dominio?.message}
                />
                <div className="row">
                  <div className="col-lg-12">
                    <InputText
                      label="Gateway"
                      name="gateway"
                      control={control}
                      register={register}
                      error={!!errors.gateway}
                      helperText={errors.gateway?.message}
                    />
                  </div>
                </div>
                <InputText
                  label="Tempo de atividade."
                  name="tempoLigado"
                  control={control}
                  register={register}
                  error={!!errors.tempoLigado}
                  helperText={errors.tempoLigado?.message}
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
                <div className="row">
                  <div className="col-md-12">
                    <InputText
                      label="Hostname"
                      name="nomeHost"
                      control={control}
                      register={register}
                      error={!!errors.nomeHost}
                      helperText={errors.nomeHost?.message}
                    />
                  </div>
                </div>
                <InputText
                  label="Numero de série"
                  name="numeroSerie"
                  control={control}
                  register={register}
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />
                <div className="row">
                  <div className="col-lg-12">
                    <InputText
                      label="Modelo"
                      name="modelo"
                      control={control}
                      register={register}
                      error={!!errors.modelo}
                      helperText={errors.modelo?.message}
                    />
                  </div>
                  <div className="col-lg-3"></div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <InputDate register={register} label="Data aquisição" control={control} name="dtAquisicao" />
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
              {formContextData.isAdding && (
                <Box display={'flex'} flexDirection={'column'}>
                  <BaseCard>
                    <Stack border={'1px #d6d6d6 solid'} marginTop={0.5} height={'100px'}>
                      <Typography
                        borderRadius={'8px 8px 0px 0px'}
                        bgcolor={'#F8FAFC'}
                        padding={1}
                        fontSize={16}
                        fontWeight={'bold'}
                        letterSpacing={1}
                        color={'primary'}
                        variant="h2"
                      >
                        Interfaces
                      </Typography>
                      <DataTable
                        striped
                        dense
                        columns={columns}
                        data={interfaces ? interfaces : []}
                        noDataComponent={<NoData />}
                        responsive
                        fixedHeader
                        pointerOnHover
                        highlightOnHover
                        onRowClicked={() => {}}
                        customStyles={{
                          headCells: {
                            style: {
                              fontWeight: 'bold',
                              height: 26,
                              fontSize: 13,
                              letterSpacing: 0.5,
                            },
                          },
                        }}
                      />
                    </Stack>
                  </BaseCard>
                </Box>
              )}
            </div>
            <Box display={'flex'} justifyContent={'end'} marginTop={2}>
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

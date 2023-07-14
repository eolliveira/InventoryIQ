import Box from '@mui/material/Box';
import { BaseCard } from '../../../../style/GlobalStyles';
import { Button } from '@mui/material';
import { Workstation } from '../../../../types/Workstation/Workstation';
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
import { WorkstationSync } from 'types/Workstation/WorkstationSync';
import { Interface } from 'types/Interface';
import { Disco } from 'types/Workstation/Disco';
import { Particao } from 'types/Workstation/Particao';
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

const columns: TableColumn<Interface>[] = [
  { name: 'Fabricante', selector: (row) => row.fabricante },
  { name: 'Ip', selector: (row) => row.enderecoIp },
  { name: 'Mascara', selector: (row) => row.mascaraSubRede },
  { name: 'Mac', selector: (row) => row.enderecoMac },
];

const discColumns: TableColumn<Disco>[] = [
  { name: 'Nome', selector: (row) => row.nome },
  { name: 'Modelo', selector: (row) => row.modelo },
  { name: 'Capacidade', selector: (row) => row.capacidade },
];

type WorkstationFormProps = {
  data?: Workstation;
  openForm: boolean;
  closeForm: () => void;
};

export default function WorkstationForm({
  data,
  openForm,
  closeForm,
}: WorkstationFormProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [sweeping, setSweeping] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [interfaces, setInterfaces] = useState<Interface[]>();
  const [discos, setDiscos] = useState<Disco[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<WorkstationSync>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && formContextData.isEditing) setFormData(data);
    if (data && formContextData.isDuplicated && formContextData.isAdding)
      setFormData(data);
  }, []);

  const onSubmit = (formData: WorkstationSync) => {
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
          url: formContextData.isAdding
            ? `/workstation`
            : `/workstation/${data?.id}/update`,
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
            navigate(`/workstation/${response.data.id}`);
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
      url: `/workstation/data/${ipAddress}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        const interfaces: Interface[] = [];
        const discos: Disco[] = [];

        setValue('fabricante', response.data.fabricante);
        setValue('nomeHost', response.data.nomeHost);
        setValue('arquiteturaSo', response.data.arquiteturaSo);
        setValue('memoriaRam', response.data.memoriaRam);
        setValue('gateway', response.data.gateway);
        setValue('dominio', response.data.dominio);
        setValue('dnsList', response.data.dnsList);
        setValue('ultimoUsuarioLogado', response.data.ultimoUsuarioLogado);
        setValue('sistemaOperacional', response.data.sistemaOperacional);
        setValue('processador', response.data.processador);
        setValue('numeroSerie', response.data.numeroSerie);
        setValue('modelo', response.data.modelo);

        response.data.interfaces.forEach((i: Interface) => interfaces.push(i));
        setInterfaces(response.data.interfaces);

        response.data.discos.forEach((disco: Disco) => {
          const particoes: Particao[] = [];
          disco.particoes.forEach((particao: Particao) => {
            const p: Particao = {
              pontoMontagem: particao.pontoMontagem,
              capacidade: particao.capacidade,
              usado: particao.usado,
            };
            particoes.push(p);
          });
          disco.particoes = particoes;
          discos.push(disco);
        });

        setDiscos(response.data.discos);
        setValue('interfaces', interfaces);
        setValue('discos', discos);
      })
      .catch(() => {
        Swal.fire({
          title: 'Falha!',
          text: `Não foi possivel obter os dados do ativo. Por favor verifique se o endereço ip esta correto e se o agente esta configurado corretamente!`,
          icon: 'warning',
          confirmButtonColor: '#999999',
        });
      })
      .finally(() => setSweeping(false));
  };

  const setFormData = (data: Workstation) => {
    formContextData.isDuplicated
      ? setValue('nome', '')
      : setValue('nome', data.nome);
    setValue('fabricante', data.fabricante);
    setValue('nomeHost', data.nomeHost);
    setValue('dominio', data.dominio);
    setValue('dnsList', data.dns);
    setValue('gateway', data.gateway);
    setValue('arquiteturaSo', data.arquiteturaSo);
    setValue('memoriaRam', data.memoriaRam);
    setValue('ultimoUsuarioLogado', data.ultimoUsuarioLogado);
    setValue('sistemaOperacional', data.sistemaOperacional);
    setValue('processador', data.processador);
    setValue('numeroSerie', data.numeroSerie);
    setValue('modelo', data.modelo);
    setValue('dtAquisicao', data.dtAquisicao);
    setValue('dtVencimentoGarantia', data.dtVencimentoGarantia);
    setValue('vlrAquisicao', data.vlrAquisicao);
    setValue('observacao', data.observacao);
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel
          title={
            formContextData.isAdding
              ? 'Adicionar Estação de Trabalho'
              : 'Alterar Estação de Trabalho'
          }
        >
          {formContextData.isAdding && (
            <Box display={'flex'}>
              <SearchBar
                placeholder="0.0.0.0"
                inputFilter={ipAddress}
                setInputFilter={setIpAddress}
              />

              <LoadingButton
                size="small"
                color="primary"
                onClick={handleToSweep}
                loading={sweeping}
                variant="text"
              >
                <SearchIcon fontSize="medium" />
              </LoadingButton>
            </Box>
          )}

          <form
            style={{ maxWidth: '1250px' }}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                <div className="row">
                  <div className="col-sm-8">
                    <InputText
                      label="Hostname"
                      name="nomeHost"
                      control={control}
                      register={register}
                      error={!!errors.nomeHost}
                      helperText={errors.nomeHost?.message}
                    />
                  </div>
                  <div className="col-sm-4">
                    <InputText
                      label="Memória ram(Virtual)"
                      name="memoriaRam"
                      control={control}
                      register={register}
                      error={!!errors.memoriaRam}
                      helperText={errors.memoriaRam?.message}
                    />
                  </div>
                </div>

                <InputText
                  label="Dominio"
                  name="dominio"
                  control={control}
                  register={register}
                  error={!!errors.dominio}
                  helperText={errors.dominio?.message}
                />
                <div className="row">
                  <div className="col-sm-6">
                    <InputText
                      label="Dns"
                      name="dnsList"
                      control={control}
                      register={register}
                      error={!!errors.dnsList}
                      helperText={errors.dnsList?.message}
                    />
                  </div>
                  <div className="col-sm-6">
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
                  label="Ultimo usuário logado."
                  name="ultimoUsuarioLogado"
                  control={control}
                  register={register}
                  error={!!errors.ultimoUsuarioLogado}
                  helperText={errors.ultimoUsuarioLogado?.message}
                />
                <InputMultiline
                  control={control}
                  name="observacao"
                  register={register}
                  label="Observação"
                  rows={3.5}
                  error={!!errors.observacao}
                  helperText={errors.observacao?.message}
                />
              </div>
              <div className="col-md-6">
                <InputText
                  label=" Sistema operacional"
                  name="sistemaOperacional"
                  control={control}
                  register={register}
                  error={!!errors.sistemaOperacional}
                  helperText={errors.sistemaOperacional?.message}
                />

                <InputText
                  label="Processador"
                  name="processador"
                  control={control}
                  register={register}
                  error={!!errors.processador}
                  helperText={errors.processador?.message}
                />

                <InputText
                  label="Numero de série"
                  name="numeroSerie"
                  control={control}
                  register={register}
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />

                <InputText
                  label="Fabricante"
                  name="fabricante"
                  control={control}
                  register={register}
                  error={!!errors.fabricante}
                  helperText={errors.fabricante?.message}
                />

                <div className="row">
                  <div className="col-sm-9">
                    <InputText
                      label="Modelo"
                      name="modelo"
                      control={control}
                      register={register}
                      error={!!errors.modelo}
                      helperText={errors.modelo?.message}
                    />
                  </div>
                  <div className="col-sm-3">
                    <InputText
                      label="Arquitetura"
                      name="arquiteturaSo"
                      control={control}
                      register={register}
                      error={!!errors.arquiteturaSo}
                      helperText={errors.arquiteturaSo?.message}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 col-lg-5">
                    <InputDate
                      register={register}
                      label="Dt. Aquisição"
                      control={control}
                      name="dtAquisicao"
                    />
                  </div>
                  <div className="col-sm-6 col-lg-4 ">
                    <InputDate
                      register={register}
                      name="dtVencimentoGarantia"
                      label="Dt.Venc.Garantia"
                      control={control}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
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
                    <Stack
                      border={'1px #d6d6d6 solid'}
                      marginTop={0.5}
                      height={'100px'}
                    >
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

                  <BaseCard>
                    <Stack
                      border={'1px #d6d6d6 solid'}
                      marginTop={0.5}
                      height={'100px'}
                    >
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
                        Armazenamento
                      </Typography>
                      <DataTable
                        striped
                        dense
                        columns={discColumns}
                        data={discos ? discos : []}
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

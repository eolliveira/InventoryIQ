import Box from '@mui/material/Box';
import { BaseCard } from '../../../../style/GlobalStyles';
import { Button } from '@mui/material';
import { Workstation } from '../../../../types/Workstation/Workstation';
import { Field, Input, Label } from '../../../../style/GlobalStyles';
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
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { WorkstationSync } from 'types/Workstation/WorkstationSync';
import { Interface } from 'types/Interface';
import { Disco } from 'types/Workstation/Disco';
import { Particao } from 'types/Workstation/Particao';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoData from '../../../../components/NoData';

import { Dayjs } from 'dayjs';
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
  {
    name: 'Fabricante',
    selector: (row) => row.fabricante,
  },
  { name: 'Ip', selector: (row) => row.enderecoIp },
  { name: 'Mascara', selector: (row) => row.mascaraSubRede },
  { name: 'Mac', selector: (row) => row.enderecoMac },
];

const discColumns: TableColumn<Disco>[] = [
  {
    name: 'Nome',
    selector: (row) => row.nome,
  },
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
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

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
  }, []);

  const onSubmit = (formData: WorkstationSync) => {
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
            ? '/workstation'
            : `/workstation/${data?.id}/update`,
          data: formData,
        };

        requestBackend(params)
          .then((response) => {
            Swal.fire('Concluido!', 'Dados foram salvos!', 'success');
            setFormContextData({
              isAdding: false,
              isEditing: false,
            });
            navigate(`/workstation/${response.data.id}`);
            closeForm();
          })
          .catch((error) => {
            Swal.fire('Atenção', `${error.response.data.message}`, 'warning');
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

  const handleToSweep = () => {
    setSweeping(true);

    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation/data/${ipAddress}`,
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
        setValue('tempoLigado', response.data.tempoLigado);
        setValue('sistemaOperacional', response.data.sistemaOperacional);
        setValue('processador', response.data.processador);
        setValue('numeroSerie', response.data.numeroSerie);
        setValue('modelo', response.data.modelo);

        response.data.interfaces.forEach((i: Interface) => interfaces.push(i));
        setInterfaces(response.data.interfaces);

        response.data.discos.forEach((disco: Disco) => {
          disco.particoes.forEach((particao: Particao) => {
            const p: Particao = {
              pontoMontagem: particao.pontoMontagem,
              capacidade: particao.capacidade,
              usado: particao.usado,
            };
            disco.particoes.push(p);
          });
          discos.push(disco);
        });

        setDiscos(response.data.discos);

        setValue('interfaces', interfaces);
        setValue('discos', discos);
      })
      .catch((error) => {
        console.log('Erro ao buscar dados do ativo: ' + error);
      })
      .finally(() => {
        setSweeping(false);
      });
  };

  const setFormData = (data: Workstation) => {
    setValue('nome', data.nome);
    setValue('fabricante', data.fabricante);
    setValue('nomeHost', data.nomeHost);
    setValue('dominio', data.dominio);
    setValue('dnsList', data.dns);
    setValue('gateway', data.gateway);
    setValue('arquiteturaSo', data.arquiteturaSo);
    setValue('memoriaRam', data.memoriaRam);
    setValue('ultimoUsuarioLogado', data.ultimoUsuarioLogado);
    setValue('tempoLigado', data.tempoLigado);
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
        <Panel title="Adicionando Estação de Trabalho">
          {formContextData.isAdding && (
            <Box display={'flex'}>
              <SearchBar
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
          <Box
            sx={{
              marginTop: 2,
              marginBottom: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          />
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
                  <div className="col-lg-6">
                    <InputText
                      label="Dns"
                      name="dnsList"
                      control={control}
                      register={register}
                      error={!!errors.dnsList}
                      helperText={errors.dnsList?.message}
                    />
                  </div>
                  <div className="col-lg-6">
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
                  rows={6}
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
                <div className="row">
                  <div className="col-lg-6">
                    <InputText
                      label="Hostname"
                      name="nomeHost"
                      control={control}
                      register={register}
                      error={!!errors.nomeHost}
                      helperText={errors.nomeHost?.message}
                    />
                  </div>
                  <div className="col-lg-6">
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
                  label="Numero de série"
                  name="numeroSerie"
                  control={control}
                  register={register}
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />

                <div className="row">
                  <div className="col-lg-9">
                    <InputText
                      label="Modelo"
                      name="modelo"
                      control={control}
                      register={register}
                      error={!!errors.modelo}
                      helperText={errors.modelo?.message}
                    />
                  </div>
                  <div className="col-lg-3">
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
                  <div className="col-lg-5">
                    <InputDate
                      register={register}
                      label="Data aquisição"
                      control={control}
                      name="dtAquisicao"
                    />
                  </div>
                  <div className="col-lg-4">
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

              <Box display={'flex'} flexDirection={'column'}>
                <BaseCard>
                  <Panel title="Interfaces">
                    <Stack height={'100px'}>
                      <Stack direction={'row'}></Stack>
                      <DataTable
                        striped
                        dense
                        columns={columns}
                        data={interfaces ? interfaces : []}
                        noDataComponent={<NoData />}
                        responsive
                        fixedHeader
                        selectableRows
                        pointerOnHover
                        highlightOnHover
                        onRowClicked={() => {}}
                        customStyles={{
                          headCells: {
                            style: {
                              fontWeight: 'bold',
                              height: 15,
                              fontSize: 13,
                              letterSpacing: 0.5,
                            },
                          },
                        }}
                      />
                    </Stack>
                  </Panel>
                </BaseCard>

                <BaseCard>
                  <Panel title="Interfaces">
                    <Stack height={'80px'}>
                      <Stack direction={'row'}></Stack>
                      <DataTable
                        striped
                        dense
                        columns={discColumns}
                        data={discos ? discos : []}
                        noDataComponent={<NoData />}
                        responsive
                        fixedHeader
                        selectableRows
                        pointerOnHover
                        highlightOnHover
                        onRowClicked={() => {}}
                        customStyles={{
                          headCells: {
                            style: {
                              fontWeight: 'bold',
                              height: 15,
                              fontSize: 13,
                              letterSpacing: 0.5,
                            },
                          },
                        }}
                      />
                    </Stack>
                  </Panel>
                </BaseCard>
              </Box>
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

  @media (min-width: 1100px) {
    width: 1000px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }

  @media (min-width: 1400px) {
    width: 1300px;
  }
`;

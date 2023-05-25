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
import { theme } from '../../../../style/Theme';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

import { WorkstationSync } from 'types/Workstation/WorkstationSync';
import { Interface } from 'types/Interface';
import { Disco } from 'types/Workstation/Disco';
import { Particao } from 'types/Workstation/Particao';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Controller } from 'react-hook-form';
import FieldDate from '../../../../components/inputs/FieldDate/FieldDate';
import { validateHeaderValue } from 'http';
import TextField from '@mui/material/TextField';
import { error } from 'console';
import FieldText from '../../../../components/inputs/FieldText/FieldText';
import FieldMultiline from '../../../../components/inputs/FieldMultiline/FieldMultiline';
import FieldCurrency from '../../../../components/inputs/FieldCurrency/FieldCurrency';

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
  const [synchronizing, setSynchronizing] = useState(false);
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
    const params: AxiosRequestConfig = {
      method: formContextData.isAdding ? 'POST' : 'PUT',
      url: formContextData.isAdding
        ? '/workstation'
        : `/workstation/${data?.id}/update`,
      data: formData,
    };

    requestBackend(params)
      .then((response) => {
        setFormContextData({
          isAdding: false,
          isEditing: false,
        });

        window.alert('Ativo foi salvo com sucesso!');
        navigate(`/workstation/${response.data.id}`);
        closeForm();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };

  const onCancelForm = () => {
    setFormContextData({
      isAdding: false,
      isEditing: false,
    });

    closeForm();
  };

  const handleSync = () => {
    setSynchronizing(true);

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
        setSynchronizing(false);
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
    setValue('dtExpiracao', data.dtExpiracao);
    setValue('dtVencimentoGarantia', data.dtVencimentoGarantia);
    setValue('vlrAquisicao', data.vlrAquisicao);
    setValue('observacao', data.observacao);
  };

  return (
    <CustomModal openModal={openForm}>
      <Card>
        <Container>
          <h1>Adicionando Estação de Trabalho</h1>
          {formContextData.isAdding && (
            <SearchAddressContainer>
              <Field>
                <Label htmlFor="enderedIp">Endereço Ip</Label>
                <Input
                  style={{ maxWidth: 140 }}
                  type="text"
                  name="enderedIp"
                  id="enderedIp"
                  onChange={(e) => setIpAddress(e.target.value)}
                />
              </Field>

              <LoadingButton
                size="small"
                sx={{ mt: 2, color: 'black' }}
                onClick={handleSync}
                loading={synchronizing}
                variant="text"
              >
                <SearchIcon fontSize="medium" />
              </LoadingButton>
            </SearchAddressContainer>
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
              <div className="col-lg-6">
                <FieldText
                  required
                  label="Nome"
                  name="nome"
                  control={control}
                  register={register}
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                />
                <FieldText
                  label="Fabricante"
                  name="fabricante"
                  control={control}
                  register={register}
                  error={!!errors.fabricante}
                  helperText={errors.fabricante?.message}
                />
                <div className="row">
                  <div className="col-lg-6">
                    <FieldText
                      label="Hostname"
                      name="nomeHost"
                      control={control}
                      register={register}
                      error={!!errors.nomeHost}
                      helperText={errors.nomeHost?.message}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FieldText
                      label="Memória ram(Virtual)"
                      name="memoriaRam"
                      control={control}
                      register={register}
                      error={!!errors.memoriaRam}
                      helperText={errors.memoriaRam?.message}
                    />
                  </div>
                </div>
                <FieldText
                  label="Dominio"
                  name="dominio"
                  control={control}
                  register={register}
                  error={!!errors.dominio}
                  helperText={errors.dominio?.message}
                />
                <div className="row">
                  <div className="col-lg-6">
                    <FieldText
                      label="Dns"
                      name="dnsList"
                      control={control}
                      register={register}
                      error={!!errors.dnsList}
                      helperText={errors.dnsList?.message}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FieldText
                      label="Gateway"
                      name="gateway"
                      control={control}
                      register={register}
                      error={!!errors.gateway}
                      helperText={errors.gateway?.message}
                    />
                  </div>
                </div>
                <FieldText
                  label="Ultimo usuário logado."
                  name="ultimoUsuarioLogado"
                  control={control}
                  register={register}
                  error={!!errors.ultimoUsuarioLogado}
                  helperText={errors.ultimoUsuarioLogado?.message}
                />
                <FieldText
                  label="Tempo de atividade."
                  name="tempoLigado"
                  control={control}
                  register={register}
                  error={!!errors.tempoLigado}
                  helperText={errors.tempoLigado?.message}
                />
                <FieldMultiline
                  control={control}
                  name="observacao"
                  register={register}
                  label="Observação"
                  rows={10}
                  error={!!errors.observacao}
                  helperText={errors.observacao?.message}
                />
              </div>
              <div className="col-lg-6">
                <FieldText
                  label=" Sistema operacional."
                  name="sistemaOperacional"
                  control={control}
                  register={register}
                  error={!!errors.sistemaOperacional}
                  helperText={errors.sistemaOperacional?.message}
                />

                <FieldText
                  label="Processador"
                  name="processador"
                  control={control}
                  register={register}
                  error={!!errors.processador}
                  helperText={errors.processador?.message}
                />

                <FieldText
                  label="Numero de série."
                  name="numeroSerie"
                  control={control}
                  register={register}
                  error={!!errors.numeroSerie}
                  helperText={errors.numeroSerie?.message}
                />

                <div className="row">
                  <div className="col-lg-9">
                    <FieldText
                      label="Modelo"
                      name="numeroSerie"
                      control={control}
                      register={register}
                      error={!!errors.numeroSerie}
                      helperText={errors.numeroSerie?.message}
                    />
                  </div>
                  <div className="col-lg-3">
                    <FieldText
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
                  <div className="col-lg-6">
                    <FieldDate
                      register={register}
                      label="Data aquisição"
                      control={control}
                      name="dtAquisicao"
                    />
                  </div>
                  <div className="col-lg-6">
                    <FieldDate
                      register={register}
                      name="dtExpiracao"
                      label="Data expiração"
                      control={control}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <FieldDate
                      register={register}
                      name="dtVencimentoGarantia"
                      label="Data venc.Garantia"
                      control={control}
                    />

                    <FieldCurrency
                      label="Valor compra"
                      name="vlrAquisicao"
                      control={control}
                      register={register}
                      error={!!errors.vlrAquisicao}
                      helperText={errors.vlrAquisicao?.message}
                    />
                  </div>
                </div>

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dtAquisicao"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data"
                          format="DD/MM/YYYY"
                          value={value ? dayjs(value) : null}
                          onChange={(newValue) => {
                            const dateFormat = dayjs
                              .utc(newValue)
                              .local()
                              .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                            onChange(dateFormat);
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />

                  <DatePicker
                    format="DD/MM/YYYY"
                    value={dateValue}
                    onChange={(newValue) => {
                      const dataFormatada = dayjs
                        .utc(newValue)
                        .local()
                        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                      console.log(dataFormatada);
                    }}
                  />
                </LocalizationProvider> */}

                {<h1>{String(dateValue)}</h1>}

                <h3>Rede(interfaces)</h3>
                {interfaces?.map((e) => (
                  <h6 key={e.id}>{e.enderecoMac}</h6>
                ))}

                <h3>Armazenamento</h3>
                {discos?.map((d) => (
                  <h6>{d.modelo}</h6>
                ))}
              </div>
            </div>

            <ButtonContainer>
              <div>
                <Button
                  style={{
                    color: 'white',
                    marginRight: '10px',
                    backgroundColor: '#e66d6d',
                    textTransform: 'none',
                  }}
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={onCancelForm}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  type="submit"
                  color="inherit"
                  loading={false}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  sx={{ color: '#64D49E' }}
                >
                  <span>Salvar</span>
                </LoadingButton>
              </div>
            </ButtonContainer>
          </Form>
        </Container>
      </Card>
    </CustomModal>
  );
}

const SearchAddressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Card = styled(BaseCard)``;

const Container = styled.div`
  @media (min-width: 992px) {
    width: 800px;
  }

  @media (min-width: 1240px) {
    width: 1000px;
  }
`;

const Form = styled.form``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

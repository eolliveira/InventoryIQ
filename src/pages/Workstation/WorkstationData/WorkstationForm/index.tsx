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

import { Dayjs } from 'dayjs';
import InputDate from '../../../../components/inputs/InputDate';
import InputText from '../../../../components/inputs/InputText';
import InputCurrency from '../../../../components/inputs/InputCurrency';
import InputMultiline from '../../../../components/inputs/InputMultiline';
import Swal from 'sweetalert2';
import Panel from '../../../../components/Panel';

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
    Swal.fire({
      title: 'Salvar dados?',
      text: 'Deseja salvar os dados do ativo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: 'secondary',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
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
      <BaseCard>
        <Panel title="Adicionando Estação de Trabalho">
          {/* <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant="h6">
              Adicionando Estação de Trabalho
            </Typography>
            <IconButton size="medium" onClick={onCancelForm}>
              <CloseRoundedIcon color="primary" />
            </IconButton>
          </Box> */}

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
              <div className="col-lg-6">
                <InputText
                  label=" Sistema operacional."
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
                  label="Numero de série."
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
                      name="numeroSerie"
                      control={control}
                      register={register}
                      error={!!errors.numeroSerie}
                      helperText={errors.numeroSerie?.message}
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
                      label="Data expiração"
                      control={control}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <InputDate
                      register={register}
                      name="dtVencimentoGarantia"
                      label="Data venc.Garantia"
                      control={control}
                    />

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
        </Panel>
      </BaseCard>
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

import Box from '@mui/material/Box';
import { BaseCard } from '../../../../style/GlobalStyles';
import { Button } from '@mui/material';

import { Workstation } from '../../../../types/Workstation/Response/Workstation';
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

import { WorkstationSync } from 'types/Workstation/Response/WorkstationSync';
import { Interface } from 'types/Interface';
import { Disco } from 'types/Workstation/Disco';
import { Particao } from 'types/Workstation/Particao';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Controller } from 'react-hook-form';


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
  const [synchronizing, setSynchronizing] = useState(false);
  const [ipAddress, setIpAddress] = useState('');


  const [ interfaces, setInterfaces ] = useState<Interface[]>()
  const [ discos , setDiscos ] = useState<Disco[]>()


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
        setInterfaces(response.data.interfaces)

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

        setDiscos(response.data.discos)

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
    setValue('dtAquisicao', dayjs(data.dtAquisicao));
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
                <Field>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    {...register('nome', {
                      required: 'Campo requerido',
                    })}
                    className={`form-control base-input mb-2 ${
                      errors.nome ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="nome"
                    id={'nome'}
                  />
                </Field>
                <Field>
                  <Label htmlFor="fabricante">Fabricante</Label>
                  <Input
                    {...register('fabricante')}
                    className={`form-control base-input mb-2 ${
                      errors.fabricante ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="fabricante"
                    id="fabricante"
                  />
                </Field>

                <div className="row">
                  <div className="col-lg-6">
                    <Field>
                      <Label htmlFor="nomeHost">Hostname</Label>
                      <Input
                        {...register('nomeHost')}
                        className={`form-control base-input mb-2 ${
                          errors.nomeHost ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="nomeHost"
                        id="nomeHost"
                      />
                    </Field>
                  </div>
                  <div className="col-lg-6">
                    <Field>
                      <Label htmlFor="memoriaRam">Memória ram(Virtual)</Label>
                      <Input
                        {...register('memoriaRam')}
                        className={`form-control base-input mb-2 ${
                          errors.memoriaRam ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="memoriaRam"
                        id="memoriaRam"
                      />
                    </Field>
                  </div>
                </div>

                <Field>
                  <Label htmlFor="dominio">Dominio</Label>
                  <Input
                    {...register('dominio')}
                    className={`form-control base-input mb-2 ${
                      errors.dominio ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="dominio"
                    id="dominio"
                  />
                </Field>

                <div className="row">
                  <div className="col-lg-6">
                    <Field>
                      <Label htmlFor="dnsList">Dns</Label>
                      <Input
                        {...register('dnsList')}
                        className={`form-control base-input mb-2 ${
                          errors.dnsList ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="dnsList"
                        id="dnsList"
                      />
                    </Field>
                  </div>
                  <div className="col-lg-6">
                    <Field>
                      <Label htmlFor="gateway">Gateway</Label>
                      <Input
                        {...register('gateway')}
                        className={`form-control base-input mb-2 ${
                          errors.gateway ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="gateway"
                        id="gateway"
                      />
                    </Field>
                  </div>
                </div>

                <Field>
                  <Label htmlFor="ultimoUsuarioLogado">
                    Ultimo usuário logado
                  </Label>
                  <Input
                    {...register('ultimoUsuarioLogado')}
                    className={`form-control base-input mb-2 ${
                      errors.ultimoUsuarioLogado ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="ultimoUsuarioLogado"
                    id="ultimoUsuarioLogado"
                  />
                </Field>
                <Field>
                  <Label htmlFor="tempoLigado">Tempo atividade</Label>
                  <Input
                    {...register('tempoLigado')}
                    className={`form-control base-input mb-2 ${
                      errors.tempoLigado ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="tempoLigado"
                    id="tempoLigado"
                  />
                </Field>
                <Field>
                  <Label htmlFor="observacao">Observação</Label>
                  <textarea
                    rows={10}
                    {...register('observacao')}
                    className={`form-control base-input mb-2 ${
                      errors.observacao ? 'is-invalid' : ''
                    }`}
                    style={{
                      padding: 5,
                      borderRadius: 3,
                      backgroundColor: 'unset',
                      fontSize: `${theme.size.sm}`,
                      color: `${theme.colors.black}`,
                      border: `1px solid ${theme.colors.secondary}`,
                    }}
                    name="observacao"
                    id="observacao"
                  />
                </Field>
              </div>
              <div className="col-lg-6">
                <Field>
                  <Label htmlFor="sistemaOperacional">
                    Sistema operacional
                  </Label>
                  <Input
                    {...register('sistemaOperacional')}
                    className={`form-control base-input mb-2 ${
                      errors.sistemaOperacional ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="sistemaOperacional"
                    id="sistemaOperacional"
                  />
                </Field>
                <Field>
                  <Label htmlFor="processador">Processador</Label>
                  <Input
                    {...register('processador')}
                    className={`form-control base-input mb-2 ${
                      errors.processador ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="processador"
                    id="processador"
                  />
                </Field>
                <Field>
                  <Label htmlFor="numeroSerie">Numero de série</Label>
                  <Input
                    {...register('numeroSerie')}
                    className={`form-control base-input mb-2 ${
                      errors.numeroSerie ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="numeroSerie"
                    id="numeroSerie"
                  />
                </Field>

                <div className="row">
                  <div className="col-lg-9">
                    <Field>
                      <Label htmlFor="modelo">Modelo</Label>
                      <Input
                        {...register('modelo')}
                        className={`form-control base-input mb-2 ${
                          errors.modelo ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="modelo"
                        id="modelo"
                      />
                    </Field>
                  </div>
                  <div className="col-lg-3">
                    <Field>
                      <Label htmlFor="arquiteturaSo">Arquitetura</Label>
                      <Input
                        {...register('arquiteturaSo')}
                        className={`form-control base-input mb-2 ${
                          errors.arquiteturaSo ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="arquiteturaSo"
                        id="arquiteturaSo"
                      />
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    {/* <Field>
                      <Label htmlFor="dtAquisicao">Data aquisição</Label>
                      <Input
                        {...register('dtAquisicao')}
                        className={`form-control base-input mb-2 ${
                          errors.dtAquisicao ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="dtAquisicao"
                        id="dtAquisicao"
                      />
                    </Field> */}
                    
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name={'dtAquisicao'}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          value={value || null}
                          onChange={onChange}
                          format={'DD/MM/YYYY'}
                        />
                      )}
                    />
                </LocalizationProvider>



                  </div>
                  <div className="col-lg-6">
                    <Field>
                      <Label htmlFor="dtExpiracao">Data expiração</Label>
                      <Input
                        {...register('dtExpiracao')}
                        className={`form-control base-input mb-2 ${
                          errors.dtExpiracao ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="dtExpiracao"
                        id="dtExpiracao"
                      />
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <Field>
                      <Label htmlFor="dtVencimentoGarantia">
                        Data venc. Garantia
                      </Label>
                      <Input
                        {...register('dtVencimentoGarantia')}
                        className={`form-control base-input mb-2 ${
                          errors.dtVencimentoGarantia ? 'is-invalid' : ''
                        }`}
                        type="text"
                        name="dtVencimentoGarantia"
                        id="dtVencimentoGarantia"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="vlrAquisicao">Valor compra</Label>
                      <Input
                        {...register('vlrAquisicao')}
                        className={`form-control base-input mb-2 ${
                          errors.vlrAquisicao ? 'is-invalid' : ''
                        }`}
                        type="number"
                        name="vlrAquisicao"
                        id="vlrAquisicao"
                      />
                    </Field>
                  </div>
                </div>






                <h3>Rede(interfaces)</h3>
                {
                  interfaces?.map((e) => <h6>{e.enderecoMac}</h6>)
                }


                <h3>Armazenamento</h3>
                {
                  discos?.map((d) => <h6>{d.modelo}</h6>)
                }



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

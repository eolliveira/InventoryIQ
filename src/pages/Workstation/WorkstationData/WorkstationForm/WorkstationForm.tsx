import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BaseCard } from '../../../../style/GlobalStyles';
import styled from 'styled-components';
import { Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Workstation } from '../../../../types/Workstation/Workstation';
import { Field, Input, Label } from '../../../../style/GlobalStyles';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { FormContext } from '../../../../contexts/FormContext';
import {
  Navigate,
  useBeforeUnload,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../../http/requests';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import { theme } from '../../../../style/Theme';
import SearchIcon from '@mui/icons-material/Search';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Workstation>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && formContextData.isEditing) setFormData(data);
  }, []);

  const onSubmit = (formData: Workstation) => {
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

        window.alert('Gravado com sucesso!');
        navigate(`/workstation/${response.data.id}`);
        closeForm();
      })
      .catch((error) => {
        console.log('Erro ao inserir novo ativo' + error);
      });
  };

  const onCancelForm = () => {
    setFormContextData({
      isAdding: false,
      isEditing: false,
    });

    closeForm();
  };

  const setFormData = (data: Workstation) => {
    setValue('nome', data.nome);
    setValue('fabricante', data.fabricante);
    setValue('nomeHost', data.nomeHost);
    setValue('dominio', data.dominio);
    setValue('dns', data.dns);
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
                />
              </Field>
              <IconButton
                size="large"
                sx={{ mt: 2, color: 'black' }}
                onClick={() => {}}
              >
                <SearchIcon fontSize="medium" />
              </IconButton>
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
                <Field>
                  <Label htmlFor="dns">Dns</Label>
                  <Input
                    {...register('dns')}
                    className={`form-control base-input mb-2 ${
                      errors.dns ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="dns"
                    id="dns"
                  />
                </Field>
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

                <div className="row">
                  <div className="col-lg-6">
                    <Field>
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
                    </Field>
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

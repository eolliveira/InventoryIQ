import { Workstation } from '../../../../types/Workstation';
import { Field, Input, Label } from '../../../../style/GlobalStyles';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { theme } from '../../../../style/Theme';
import styled from '@emotion/styled';

type WorkstationDetailsProps = {
  data?: Workstation;
  isEditing?: boolean;
  isAdding?: boolean;
};

export default function WorkstationDetails({
  data,
  isAdding,
  isEditing,
}: WorkstationDetailsProps) {
  const [active, setActive] = useState<Workstation>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Workstation>();

  const onSubmit = (formData: Workstation) => {
    console.log('vento submit do form' + formData);
  };

  useEffect(() => {
    console.log('evento useEffecct WorkstationDetails');

    if (!isAdding) {
      setActive(data);
      if (data) setData(data);
      console.log('isadding: ' + isAdding);
    } else {
      clearData()
    }
  }, [data, isAdding, isEditing]);

  const setData = (data: Workstation) => {
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
  };

  const clearData = () => {
    setValue('nome', '');
    setValue('fabricante','');
    setValue('nomeHost', '');
    setValue('dominio', '');
    setValue('dns', '');
    setValue('ultimoUsuarioLogado','');
    setValue('tempoLigado','');
    setValue('sistemaOperacional','');
    setValue('processador', '');
    setValue('numeroSerie', '');
    setValue('modelo', '');
    setValue('dtAquisicao', '');
    setValue('dtExpiracao', '');

    setValue('dtVencimentoGarantia', '');
    setValue('vlrAquisicao', 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
            />
          </Field>
          <Field>
            <Label htmlFor="ultimoUsuarioLogado">Ultimo usuário logado</Label>
            <Input
              {...register('ultimoUsuarioLogado')}
              className={`form-control base-input mb-2 ${
                errors.ultimoUsuarioLogado ? 'is-invalid' : ''
              }`}
              type="text"
              name="ultimoUsuarioLogado"
              id="ultimoUsuarioLogado"
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
            />
          </Field>
        </div>
        <div className="col-lg-6">
          <Field>
            <Label htmlFor="sistemaOperacional">Sistema operacional</Label>
            <Input
              {...register('sistemaOperacional')}
              className={`form-control base-input mb-2 ${
                errors.sistemaOperacional ? 'is-invalid' : ''
              }`}
              type="text"
              name="sistemaOperacional"
              id="sistemaOperacional"
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
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
              disabled={!(isEditing || isAdding)}
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
                  disabled={!(isEditing || isAdding)}
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
                  disabled={!(isEditing || isAdding)}
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
                  disabled={!(isEditing || isAdding)}
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
                  disabled={!(isEditing || isAdding)}
                />
              </Field>
            </div>
            <div className="col-lg-6">
              <h1>anexo</h1>
            </div>
          </div>
        </div>
      </div>

      <ButtonContainer>
        <Button
          style={{
            color: 'white',
            marginRight: '10px',
            backgroundColor: '#e66d6d',
            textTransform: 'none',
          }}
          variant="contained"
          startIcon={<SaveIcon />}
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
      </ButtonContainer>
    </form>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;

`;

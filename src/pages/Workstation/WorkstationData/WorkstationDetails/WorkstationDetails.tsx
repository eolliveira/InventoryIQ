import { Workstation } from '../../../../types/Workstation';
import { Field, Input, Label } from '../../../../style/GlobalStyles';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

type WorkstationDetailsProps = {
  data: Workstation;
};

export default function WorkstationDetails({ data }: WorkstationDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Workstation>();

  const onSubmit = (formData: Workstation) => {
    console.log('submit do form' + formData);
  };

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
  }

  useEffect(() => {
    setData(data)
    console.log("use efecct teste wokstationDetails");
  }, []);

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
              className={`form-control base-input mb-3 ${
                errors.nome ? 'is-invalid' : ''
              }`}
              type="text"
              name="nome"
              placeholder="Nome do ativo"
            />
          </Field>
          <Field>
            <Label htmlFor="fabricante">Fabricante</Label>
            <Input
              {...register('fabricante')}
              className={`form-control base-input mb-3 ${
                errors.fabricante ? 'is-invalid' : ''
              }`}
              type="text"
              name="fabricante"
              placeholder="Fabricante"
              id='fabricante'
            />
          </Field>
          <Field>
            <Label htmlFor="nomeHost">Hostname</Label>
            <Input id="nomeHost" />
          </Field>
          <Field>
            <Label htmlFor="dominio">Dominio</Label>
            <Input id="dominio" />
          </Field>
          <Field>
            <Label htmlFor="dns">Dns</Label>
            <Input id="dns" />
          </Field>
          <Field>
            <Label htmlFor="ultimoUsuarioLogado">Ultimo usuário logado</Label>
            <Input id="ultimoUsuarioLogado" />
          </Field>
          <Field>
            <Label htmlFor="tempoLigado">Tempo atividade</Label>
            <Input id="tempoLigado" />
          </Field>
        </div>
        <div className="col-lg-6">
          <Field>
            <Label htmlFor="sistemaOperacional">Sistema operacional</Label>
            <Input id="sistemaOperacional" />
          </Field>
          <Field>
            <Label htmlFor="processador">Processador</Label>
            <Input id="processador" />
          </Field>
          <Field>
            <Label htmlFor="numeroSerie">Numero de série</Label>
            <Input id="numeroSerie" />
          </Field>
          <Field>
            <Label htmlFor="modelo">Modelo</Label>
            <Input id="modelo" />
          </Field>
          <Field>
            <Label htmlFor="status">Data aquisição</Label>
            <Input name="status" id="status" />
          </Field>
          <Field>
            <Label htmlFor="status">Data expiração</Label>
            <Input name="status" id="status" />
          </Field>
        </div>
      </div>
    </form>
  );
}

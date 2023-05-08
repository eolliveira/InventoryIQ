import { Workstation } from '../../../../types/Workstation';
import { Field, Input, Label } from '../../../../style/GlobalStyles';

import { theme } from '../../../../style/Theme';

type WorkstationDetailsProps = {
  data?: Workstation;
};

export default function WorkstationDetails({ data }: WorkstationDetailsProps) {
  return (
    <form>
      <div className="row">
        <div className="col-lg-6">
          <Field>
            <Label htmlFor="nome">Nome</Label>
            <Input
              value={data ? data.nome : ''}
              onChange={() => {}}
              type="text"
              id={'nome'}
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="fabricante">Fabricante</Label>
            <Input
              value={data ? data.fabricante : ''}
              onChange={() => {}}
              type="text"
              id="fabricante"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="nomeHost">Hostname</Label>
            <Input
              value={data ? data.nomeHost : ''}
              onChange={() => {}}
              type="text"
              id="nomeHost"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="dominio">Dominio</Label>
            <Input
              value={data ? data.dominio : ''}
              onChange={() => {}}
              type="text"
              id="dominio"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="dns">Dns</Label>
            <Input
              value={data ? data.dns : ''}
              onChange={() => {}}
              type="text"
              id="dns"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="ultimoUsuarioLogado">Ultimo usuário logado</Label>
            <Input
              value={data ? data.ultimoUsuarioLogado : ''}
              onChange={() => {}}
              type="text"
              id="ultimoUsuarioLogado"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="tempoLigado">Tempo atividade</Label>
            <Input
              value={data ? data.tempoLigado : ''}
              onChange={() => {}}
              type="text"
              id="tempoLigado"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="observacao">Observação</Label>
            <textarea
              rows={10}
              value={data ? data.observacao : ''}
              onChange={() => {}}
              style={{
                padding: 5,
                borderRadius: 3,
                backgroundColor: 'unset',
                fontSize: `${theme.size.sm}`,
                color: `${theme.colors.black}`,
                border: `1px solid ${theme.colors.secondary}`,
              }}
              id="observacao"
              disabled={true}
            />
          </Field>
        </div>
        <div className="col-lg-6">
          <Field>
            <Label htmlFor="sistemaOperacional">Sistema operacional</Label>
            <Input
              value={data ? data.sistemaOperacional : ''}
              onChange={() => {}}
              type="text"
              id="sistemaOperacional"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="processador">Processador</Label>
            <Input
              value={data ? data.processador : ''}
              onChange={() => {}}
              type="text"
              id="processador"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="numeroSerie">Numero de série</Label>
            <Input
              value={data ? data.numeroSerie : ''}
              onChange={() => {}}
              type="text"
              id="numeroSerie"
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="modelo">Modelo</Label>
            <Input
              value={data ? data.modelo : ''}
              onChange={() => {}}
              type="text"
              id="modelo"
              disabled={true}
            />
          </Field>

          <div className="row">
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="dtAquisicao">Data aquisição</Label>
                <Input
                  value={data ? data.dtAquisicao : ''}
                  onChange={() => {}}
                  type="text"
                  id="dtAquisicao"
                  disabled={true}
                />
              </Field>
            </div>
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="dtExpiracao">Data expiração</Label>
                <Input
                  value={data ? data.dtExpiracao : ''}
                  onChange={() => {}}
                  type="text"
                  id="dtExpiracao"
                  disabled={true}
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
                  value={data ? data.dtVencimentoGarantia : ''}
                  onChange={() => {}}
                  type="text"
                  id="dtVencimentoGarantia"
                  disabled={true}
                />
              </Field>
              <Field>
                <Label htmlFor="vlrAquisicao">Valor compra</Label>
                <Input
                  value={data ? data.vlrAquisicao : ''}
                  onChange={() => {}}
                  type="number"
                  id="vlrAquisicao"
                  disabled={true}
                />
              </Field>
            </div>
            <div className="col-lg-6">
              <h1>anexo</h1>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

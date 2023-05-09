import { Workstation } from '../../../../types/Workstation/Response/Workstation';
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
              value={data?.nome || ''}
              type="text"
              id={'nome'}
              disabled={true}
            />
          </Field>
          <Field>
            <Label htmlFor="fabricante">Fabricante</Label>
            <Input
              value={data?.fabricante || ''}
              type="text"
              id="fabricante"
              readOnly
            />
          </Field>
          <div className="row">
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="nomeHost">Hostname</Label>
                <Input
                  value={data?.nomeHost || ''}
                  type="text"
                  id="nomeHost"
                  readOnly
                />
              </Field>
            </div>
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="memoriaRam">Memória Virtual</Label>
                <Input
                  value={data?.memoriaRam + ' GB' || ''}
                  type="text"
                  id="memoriaRam"
                  readOnly
                />
              </Field>
            </div>
          </div>
          <Field>
            <Label htmlFor="dominio">Dominio</Label>
            <Input
              value={data?.dominio || ''}
              type="text"
              id="dominio"
              readOnly
            />
          </Field>
          <div className="row">
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="dns">Dns</Label>
                <Input value={data?.dns || ''} type="text" id="dns" readOnly />
              </Field>
            </div>
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="gateway">Gateway</Label>
                <Input
                  value={data?.gateway || ''}
                  type="text"
                  id="gateway"
                  readOnly
                />
              </Field>
            </div>
          </div>
          <Field>
            <Label htmlFor="ultimoUsuarioLogado">Ultimo usuário logado</Label>
            <Input
              value={data?.ultimoUsuarioLogado || ''}
              type="text"
              id="ultimoUsuarioLogado"
              readOnly
            />
          </Field>
          <Field>
            <Label htmlFor="tempoLigado">Tempo atividade</Label>
            <Input
              value={data?.tempoLigado || ''}
              type="text"
              id="tempoLigado"
              readOnly
            />
          </Field>
          <Field>
            <Label htmlFor="observacao">Observação</Label>
            <textarea
              rows={10}
              value={data?.observacao || ''}
              style={{
                padding: 5,
                borderRadius: 3,
                backgroundColor: 'unset',
                fontSize: `${theme.size.sm}`,
                color: `${theme.colors.black}`,
                border: `1px solid ${theme.colors.secondary}`,
              }}
              id="observacao"
              readOnly
            />
          </Field>
        </div>
        <div className="col-lg-6">
          <Field>
            <Label htmlFor="sistemaOperacional">Sistema operacional</Label>
            <Input
              value={data?.sistemaOperacional || ''}
              type="text"
              id="sistemaOperacional"
              readOnly
            />
          </Field>
          <Field>
            <Label htmlFor="processador">Processador</Label>
            <Input
              value={data?.processador || ''}
              type="text"
              id="processador"
              readOnly
            />
          </Field>
          <Field>
            <Label htmlFor="numeroSerie">Numero de série</Label>
            <Input
              value={data?.numeroSerie || ''}
              type="text"
              id="numeroSerie"
              readOnly
            />
          </Field>

          <div className="row">
            <div className="col-lg-9">
              <Field>
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  value={data ? data.modelo : ''}
                  type="text"
                  id="modelo"
                  readOnly
                />
              </Field>
            </div>
            <div className="col-lg-3">
              <Field>
                <Label htmlFor="arquiteturaSo">Arquitetura</Label>
                <Input
                  value={data ? data.arquiteturaSo : ''}
                  type="text"
                  name="arquiteturaSo"
                  id="arquiteturaSo"
                />
              </Field>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="dtAquisicao">Data aquisição</Label>
                <Input
                  value={data?.dtAquisicao || ''}
                  type="text"
                  id="dtAquisicao"
                  readOnly
                />
              </Field>
            </div>
            <div className="col-lg-6">
              <Field>
                <Label htmlFor="dtExpiracao">Data expiração</Label>
                <Input
                  value={data?.dtExpiracao || ''}
                  type="text"
                  id="dtExpiracao"
                  readOnly
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
                  value={data?.dtVencimentoGarantia || ''}
                  type="text"
                  id="dtVencimentoGarantia"
                  readOnly
                />
              </Field>
              <Field>
                <Label htmlFor="vlrAquisicao">Valor compra</Label>
                <Input
                  value={data?.vlrAquisicao || ''}
                  type="number"
                  id="vlrAquisicao"
                  readOnly
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

import { Usuario } from "../Usuario";

export type Workstation = {
  id: string;
  nome: string;
  fabricante: string;
  modelo: string;
  numeroSerie: string;
  nomeHost: string;
  inativo: boolean;
  dominio: string;
  tempoLigado: string;
  status: string;
  gateway: string;
  dtAquisicao: string;
  dtVencimentoGarantia: string;
  dtExpiracao: string;
  dtUltimoSincronismo: string;
  vlrAquisicao: number;
  observacao: string;
  usuario: Usuario;
  sistemaOperacional: string;
  processador: string;
  arquiteturaSo: string;
  memoriaRam: string;
  ultimoUsuarioLogado: string;
  dns: string;
};

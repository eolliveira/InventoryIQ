import { LocalIndustria } from "types/LocalIndustria";
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
  status: string;
  gateway: string;
  dtAquisicao: string;
  dtVencimentoGarantia: string;
  dhUltimaVarredura: string;
  vlrAquisicao: number;
  observacao: string;
  sistemaOperacional: string;
  processador: string;
  arquiteturaSo: string;
  memoriaRam: string;
  ultimoUsuarioLogado: string;
  dns: string;
  idNfEntrada: string;
  usuario: Usuario;
  localIndustria: LocalIndustria
};

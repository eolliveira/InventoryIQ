import { Interface } from 'types/Interface';
import { Disco } from './Disco';

export type WorkstationSync = {
  nome: string;
  fabricante: string;
  numeroSerie: string;
  modelo: string;
  gateway: string;
  dnsList: string;
  sistemaOperacional: string;
  arquiteturaSo: string;
  processador: string;
  memoriaRam: string;
  nomeHost: string;
  dominio: string;
  ultimoUsuarioLogado: string;
  dtAquisicao: string;
  dtVencimentoGarantia: string;
  vlrAquisicao: number;
  observacao: string;
  interfaces: Interface[];
  discos: Disco[];
  
};

import { Interface } from 'types/Interface';
import { Disco } from './Disco';

export type WorkstationSync = {
  fabricante: string;
  numeroSerie: string;
  modelo: string;
  gateway: string;
  dnsList: string;
  sistemaOperacional: string;
  arquiteturaSo: string;
  processador: string;
  memoriaRam: string;
  tempoLigado: string;
  nomeHost: string;
  dominio: string;
  ultimoUsuarioLogado: string;
  interfaces: Interface[];
  discos: Disco[];
};

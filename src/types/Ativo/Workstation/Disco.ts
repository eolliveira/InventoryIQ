import { Particao } from './Particao';

export type Disco = {
  nome: string;
  modelo: string;
  numeroSerie: string;
  capacidade: string;
  particoes: Particao[];
};

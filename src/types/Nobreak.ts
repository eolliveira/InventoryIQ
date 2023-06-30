import { LocalIndustria } from "./LocalIndustria";

export type Nobreak = {
    id: string,
    nome: string,
    fabricante: string,
    modelo: string,
    numeroSerie: string,
    status: string,
    dtAquisicao: string,
    dtVencimentoGarantia: string,
    vlrAquisicao: string,
    observacao: string,
    potencialNominal: string,
    tensaoEntrada: string,
    tensaoSaida: string,
    idNfEntrada: string,
    localIndustria: LocalIndustria
  };




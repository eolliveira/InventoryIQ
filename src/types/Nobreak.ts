import { LocalIndustria } from "./LocalIndustria";
import { Usuario } from "./Usuario";

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
    usuario: Usuario;
    localIndustria: LocalIndustria
  };




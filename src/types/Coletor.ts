import { LocalIndustria } from "./LocalIndustria";
import { Usuario } from "./Usuario";

export type Coletor = {
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
    idNfEntrada: string,
    localIndustria: LocalIndustria
    usuario: Usuario;
  };




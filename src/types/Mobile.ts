import { LocalIndustria } from "./LocalIndustria";
import { Usuario } from "./Usuario";

export type Mobile = {
    id: string,
    nome: string,
    fabricante: string,
    numeroSerie: string,
    dtAquisicao: string,
    dtVencimentoGarantia: string,
    dtExpiracao: string,
    vlrAquisicao: string,
    observacao: string,
    modelo: string,
    status: string;
    descricao: string,
    gateway: string,
    nomeHost: string,
    versaoAndroid: string
    imei: string,
    idNfEntrada: string;
    usuario: Usuario;
    localIndustria: LocalIndustria;
  };
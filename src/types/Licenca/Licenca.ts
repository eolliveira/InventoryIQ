import { Software } from "./Software";
import { TipoLicenca } from "./TipoLicenca";

export type Licenca = {
    id: string,
    nome: string,
    qtdAdquirida: number,
    qtdAlocada: number,
    chave: string,
    status: string,
    numeroSerie: string,
    dtAquisicao: string,
    dtExpiracao: string,
    vlrAquisicao: number,
    observacao: string,
    tpLicenca: TipoLicenca,
    idNfEntrada: string, 
    software: Software
  };
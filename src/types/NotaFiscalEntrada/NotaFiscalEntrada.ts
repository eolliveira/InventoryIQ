import { Pessoa } from "types/Pessoa";

export type NotaFiscalEntrada = {
  idNfEntrada: string;
  nrNotaFiscal: string;
  chaveNfe: string;
  dtEntrada: string;
  dtEmissao: string;
  valorNotaFiscal: string;
  idNfe: string;
  pessoa: Pessoa;
  };
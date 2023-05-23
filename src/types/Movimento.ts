import { Usuario } from "./Usuario";

export type Movimento = {
    id: string;
    descricao: string;
    dtMovimento: string;
    statusAtivoAnterior: string;
    statusAtivo: string;
    usuario: Usuario
  };
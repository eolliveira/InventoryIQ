import { Usuario } from "./Usuario";

export type Servico = {
    id: string;
    descricao: string;
    tipoServico: string;
    vlServico: number;
    dhGerou: string;
    usuario: Usuario;
  };
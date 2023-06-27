import { LocalIndustria } from "../LocalIndustria";
import { Usuario } from "../Usuario";

export type Printer = {
    id: string;
    nome: string;
    fabricante: string;
    modelo: string;
    numeroSerie: string;
    nomeHost: string;
    dominio: string;
    status: string;
    dtAquisicao: string;
    dtVencimentoGarantia: string;
    dhUltimaVarredura: string;
    vlrAquisicao: string;
    observacao: string;
    idNfEntrada: string;
    usuarioId: string;
    localIndustriaId: string;
    gateway: string;
    tempoLigado: string;
    totalImpressoes: string;
    enderecoMac: string,
    enderecoIp: string,
    mascaraSubRede: string,
    usuario: Usuario,
    localIndustria: LocalIndustria
  };





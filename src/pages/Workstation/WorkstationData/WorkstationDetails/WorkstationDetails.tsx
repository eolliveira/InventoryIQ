import { Workstation } from '../../../../types/Workstation/Workstation';

import dayjs from 'dayjs';
import TextInfo from '../../../../components/TextInfo/TextInfo';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Interface } from '../../../../types/Interface';
import { requestBackend } from '../../../../http/requests';

const columns: TableColumn<Interface>[] = [
  {
    name: 'Nome',
    width: '90px',
    selector: (row) => row.nomeLocal,
    sortable: true,
  },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Mascara', selector: (row) => row.mascaraSubRede, sortable: true },
  { name: 'Endereço Ip', selector: (row) => row.enderecoIp, sortable: true },
  { name: 'Endereço Mac', selector: (row) => row.enderecoMac, sortable: true },
];

type WorkstationDetailsProps = {
  data?: Workstation;
};

export default function WorkstationDetails({ data }: WorkstationDetailsProps) {
  const [listInterfaces, setListInterfaces] = useState<Interface[]>();

  const getInterfaces = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${data?.id}/interfaces`,
    };

    requestBackend(params)
      .then((response) => {
        setListInterfaces(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [data]);

  useEffect(() => {
    getInterfaces();
  }, [getInterfaces]);

  return (
    <Box marginTop={2}>
      <Card variant="outlined">
        <div className="row">
          <div className="col-lg-6">
            <TextInfo label="Nome" text={data?.nome} />
            <TextInfo label="Fabricante" text={data?.fabricante} />
            <TextInfo label="Hostname" text={data?.nomeHost} />
            <TextInfo label="Memória Virtual" text={data?.memoriaRam} />
            <TextInfo label="Dominio" text={data?.dominio} />
            <TextInfo label="Gateway" text={data?.gateway} />
            <TextInfo label="Dns" text={data?.dns} />

            <TextInfo
              label="Ultimo usuário logado"
              text={data?.ultimoUsuarioLogado}
            />
            <TextInfo label="Tempo atividade" text={data?.tempoLigado} />
            <TextInfo label="Observação" text={data?.observacao} />
          </div>
          <div className="col-lg-6">
            <TextInfo
              label="Sistema operacional"
              text={data?.sistemaOperacional}
            />
            <TextInfo label="Processador" text={data?.processador} />
            <TextInfo label="Numero de série" text={data?.numeroSerie} />

            <span style={{ border: 0 }} className="row">
              <span style={{ border: 0 }} className="col-lg-7">
                <TextInfo label="Modelo" text={data?.modelo} />
              </span>
              <span style={{ border: 0 }} className="col-lg-5">
                <TextInfo label="Arquitetura" text={data?.arquiteturaSo} />
              </span>
            </span>

            <div className="row">
              <div className="col-lg-7">
                <TextInfo
                  label="Data aquisição"
                  text={
                    data?.dtAquisicao
                      ? dayjs(data?.dtAquisicao).format('DD/MM/YYYY')
                      : ''
                  }
                />
              </div>
              <div className="col-lg-5">
                <TextInfo
                  label="Data expiração"
                  text={
                    data?.dtExpiracao
                      ? dayjs(data?.dtExpiracao).format('DD/MM/YYYY')
                      : ''
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <TextInfo
                  label="Data venc. Garantia"
                  text={
                    data?.dtVencimentoGarantia
                      ? dayjs(data?.dtVencimentoGarantia).format('DD/MM/YYYY')
                      : ''
                  }
                />
                <TextInfo
                  label="Valor compra"
                  text={String(data?.vlrAquisicao) || ''}
                />
              </div>
              <div className="col-lg-6">
                <h2 style={{ border: '1px solid silver' }}>anexo</h2>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
        <Typography margin={2} fontSize={14} variant="subtitle2">
          Interfaces
        </Typography>
        <Divider color="gray" />
        <DataTable
          dense
          striped
          data={listInterfaces ? listInterfaces : []}
          columns={columns}
          sortIcon={<ExpandMoreIcon />}
          responsive
          fixedHeader
          selectableRows
          pointerOnHover
          highlightOnHover
          fixedHeaderScrollHeight={'82vh'}
        />
      </Card>
    </Box>
  );
}

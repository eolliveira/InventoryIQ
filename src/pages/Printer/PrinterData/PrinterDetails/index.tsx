import { Workstation } from '../../../../types/Workstation/Workstation';

import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NoData from '../../../../components/NoData';
import TextInfo from '../../../../components/TextInfo';
import { Interface } from '../../../../types/Interface';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from '../../../../http/requests';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { formatCurrency } from '../../../../utils/CurrencyConverter';
import CircularLoading from '../../../../components/Loaders/Progress';
import { Printer } from '../../../../types/Printer/Printer';

const columns: TableColumn<Interface>[] = [
  {
    name: 'Nome',
    width: '90px',
    selector: (row) => (row.nomeLocal ? row.nomeLocal : ' - '),
    sortable: true,
  },
  {
    name: 'Fabricante',
    selector: (row) => (row.fabricante ? row.fabricante : ' - '),
    sortable: true,
  },
  { name: 'Mascara', selector: (row) => row.mascaraSubRede, sortable: true },
  { name: 'Endereço Ip', selector: (row) => row.enderecoIp, sortable: true },
  { name: 'Endereço Mac', selector: (row) => row.enderecoMac, sortable: true },
];

type PrinterDetailsProps = {
  data?: Printer;
};

export default function PrinterDetails({ data }: PrinterDetailsProps) {
  const [isLoadingInterfaces, setIsLoadingInterfaces] = useState(false);
  const [listInterfaces, setListInterfaces] = useState<Interface[]>();

  const getInterfaces = useCallback(() => {
    setIsLoadingInterfaces(true);
    requestBackend({ url: `/active/${data?.id}/interfaces` })
      .then((response) => {
        setListInterfaces(response.data);
      })
      .catch((error) => console.log('Erro ao carregar as interfaces: ' + error))
      .finally(() => setIsLoadingInterfaces(false));
  }, [data]);

  useEffect(() => {
    if (data?.id) getInterfaces();
  }, [getInterfaces]);

  return (
    <Box marginTop={2}>
      <div className="row">
        <div className="col-lg-6">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #e9e9e9',
              borderRadius: 2,
              padding: 1.5,
              marginBottom: 1,
              minHeight: 386,
            }}
          >
            <TextInfo label="Nome" text={data?.nome || '-'} />
            <TextInfo label="Fabricante" text={data?.fabricante || '-'} />
            <TextInfo label="Hostname" text={data?.nomeHost || '-'} />
            <TextInfo label="Dominio" text={data?.dominio || '-'} />
            <TextInfo label="Gateway" text={data?.gateway || '-'} />
            <TextInfo label="Tempo atividade" text={data?.tempoLigado || '-'} />
            <TextInfo label="Observação" text={data?.observacao || '-'} />
          </Card>
        </div>
        <div className="col-lg-6">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #e9e9e9',
              borderRadius: 2,
              padding: 1.5,
              minHeight: 386,
            }}
          >
            <TextInfo label="Modelo" text={data?.modelo || '-'} />
            <TextInfo label="Numero de série" text={data?.numeroSerie || '-'} />
            <TextInfo label="Impressões" text={data?.totalImpressoes || '-'} />
            <TextInfo
              label="Data aquisição"
              text={
                data?.dtAquisicao
                  ? dayjs(data?.dtAquisicao).format('DD/MM/YYYY')
                  : '-'
              }
            />
            <div className="row">
              <div className="col-lg-7">
                <TextInfo
                  label="Data venc. Garantia"
                  text={
                    data?.dtVencimentoGarantia
                      ? dayjs(data?.dtVencimentoGarantia).format('DD/MM/YYYY')
                      : '-'
                  }
                />
                <TextInfo
                  label="Valor compra"
                  text={
                    data?.vlrAquisicao
                      ? formatCurrency(String(data?.vlrAquisicao))
                      : '-'
                  }
                />
              </div>
              <div className="col-lg-5">
                <h2 style={{ border: '1px solid silver' }}>anexo</h2>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Card
        sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }}
        variant="outlined"
      >
        <Typography
          margin={2}
          fontSize={16}
          fontWeight={'bold'}
          letterSpacing={1}
          color={'primary'}
          variant="h2"
        >
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
          noDataComponent={<NoData />}
          fixedHeader
          selectableRows
          pointerOnHover
          highlightOnHover
          fixedHeaderScrollHeight={'82vh'}
          progressPending={isLoadingInterfaces}
          progressComponent={<CircularLoading />}
          customStyles={{
            headCells: {
              style: {
                fontWeight: 'bold',
                height: 40,
                fontSize: 13,
                letterSpacing: 0.5,
              },
            },
          }}
        />
      </Card>
    </Box>
  );
}

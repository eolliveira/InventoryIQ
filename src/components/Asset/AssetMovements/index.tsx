import { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { Movimento } from '../../../types/Ativo/Movimento';
import { toCamelCase } from '../../../utils/StringConverter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Card from '@mui/material/Card';
import AssetStatusStyle from '../AssetStatusStyle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NoData from '../../NoData';
import { FormContext } from '../../../contexts/FormContext';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';

const columns: TableColumn<Movimento>[] = [
  { name: 'Data movimento', selector: (row) => dayjs(row.dtMovimento).format('DD/MM/YYYY'), grow: 0.6 },
  {
    name: 'Descrição',
    cell: (row) => (
      <Tooltip title={row.descricao}>
        <span>{row.descricao}</span>
      </Tooltip>
    ),
  },
  {
    name: 'Status',
    cell: (row) => (
      <>
        <AssetStatusStyle size="small" status={row.statusAtivoAnterior} />
        <ArrowRightAltIcon fontSize="small" color="primary" />
        <AssetStatusStyle size="small" status={row.statusAtivo} />
      </>
    ),
  },
  { name: 'Usuário alterou', selector: (row) => toCamelCase(row.usuario.nome) },
];

type AssetMovementsProps = { assetId?: string };

export default function AssetMovements({ assetId }: AssetMovementsProps) {
  const { formContextData } = useContext(FormContext);
  const [movements, setMovements] = useState<Movimento[]>();

  const getMovements = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/asset/${assetId}/movements`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setMovements(response.data))
      .catch((error) => console.log('Erro' + error));
  }, [assetId, formContextData]);

  useEffect(() => getMovements(), [getMovements]);

  const handleRowClicked = () => {};

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }} variant="outlined">
      <Typography margin={2} fontSize={16} fontWeight={'bold'} letterSpacing={1} color={'primary'} variant="h2">
        Movimentos do ativo
      </Typography>
      <Divider color="gray" />
      <DataTable
        dense
        striped
        data={movements ? movements : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
        onRowClicked={handleRowClicked}
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
  );
}

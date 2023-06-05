import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { Movimento } from '../../../types/Movimento';
import { toCamelCase } from '../../../utils/StringConverter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Card from '@mui/material/Card';
import AssetStatusStyle from '../../AssetStatusStyle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NoData from '../../NoData';
import { toDate } from '../../../utils/Date';

const columns: TableColumn<Movimento>[] = [
  {
    name: 'Data movimento',
    selector: (row) => toDate(row.dtMovimento),
    sortable: true,
    grow: 0.6,
  },
  { name: 'Descrição', selector: (row) => row.descricao, sortable: true },
  {
    name: 'Status',
    sortable: true,
    cell: (row) => (
      <>
        <AssetStatusStyle
          // key={row.id}
          size="small"
          status={row.statusAtivoAnterior}
        />
        <ArrowRightAltIcon fontSize="small" color="primary" />
        <AssetStatusStyle
          //key={row.id}
          size="small"
          status={row.statusAtivo}
        />{' '}
      </>
    ),
  },
  {
    name: 'Usuário alterou',
    selector: (row) => toCamelCase(row.usuario.nome),
    sortable: true,
  },
];

type AssetMovementsProps = {
  assetId?: string;
};

export default function AssetMovements({ assetId }: AssetMovementsProps) {
  const [movements, setMovements] = useState<Movimento[]>();

  const getMovements = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${assetId}/movements`,
    };

    requestBackend(params)
      .then((response) => {
        setMovements(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [assetId]);

  useEffect(() => {
    getMovements();
  }, [getMovements]);

  const handleRowClicked = () => {};

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
      <DataTable
        dense
        striped
        data={movements ? movements : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        selectableRows
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
        onRowClicked={handleRowClicked}
      />
    </Card>
  );
}

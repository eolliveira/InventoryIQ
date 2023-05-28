import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { requestBackend } from '../../../../http/requests';
import { Movimento } from '../../../../types/Movimento';
import { toCamelCase } from '../../../../utils/StringConverter';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const columns: TableColumn<Movimento>[] = [
  {
    name: 'Data movimento',
    selector: (row) => row.dtMovimento,
    sortable: true,
    grow: 0.6,
  },
  { name: 'Descrição', selector: (row) => row.descricao, sortable: true },
  {
    name: 'Status',
    selector: (row) => row.statusAtivoAnterior + ' -> ' + row.statusAtivo,
    sortable: true,
  },
  {
    name: 'Usuário',
    selector: (row) => toCamelCase(row.usuario.nome),
    sortable: true,
  },
];

type WorkstationMovementsProps = {
  workstationId?: string;
};

export default function WorkstationMovements({
  workstationId,
}: WorkstationMovementsProps) {
  const [movements, setMovements] = useState<Movimento[]>();

  const getMovements = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${workstationId}/movements`,
    };

    requestBackend(params)
      .then((response) => {
        setMovements(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [workstationId]);

  useEffect(() => {
    getMovements();
  }, [getMovements]);

  const handleRowClicked = () => {};

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
      <DataTable
        dense
        data={movements ? movements : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={
          <Typography
            margin={2}
            fontSize={16}
            fontWeight={'normal'}
            color={'primary'}
            variant="h2"
          >
            Não há dados para mostrar.
          </Typography>
        }
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

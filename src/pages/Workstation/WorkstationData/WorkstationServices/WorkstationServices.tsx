import { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import DataTable, { TableColumn } from 'react-data-table-component';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toCamelCase } from '../../../../utils/StringConverter';
import { Servico } from '../../../../types/Servico';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../../http/requests';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const columns: TableColumn<Servico>[] = [
  {
    name: 'Data servico',
    selector: (row) => row.dhGerou,
    sortable: true,
    grow: 0.6,
  },
  { name: 'Descrição', selector: (row) => row.descricao, sortable: true },
  {
    name: 'Usuário alterou',
    selector: (row) => toCamelCase(row.descricao),
    sortable: true,
  },
  {
    name: 'Valor',
    selector: (row) => row.vlServico,
    sortable: true,
  },
];

type WorkstationServiceProps = {
  workstationId?: string;
};

export default function WorkstationService({
  workstationId,
}: WorkstationServiceProps) {
  const [services, setServices] = useState<Servico[]>();

  const getServices = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${workstationId}/services`,
    };

    requestBackend(params)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [workstationId]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }} variant="outlined">
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography
          margin={2}
          fontSize={16}
          fontWeight={'bold'}
          letterSpacing={1}
          color={'primary'}
          variant="h2"
        >
          Serviços da estação de trabalho
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ height: 36.5, marginRight: 1 }}
          startIcon={<AddIcon />}
        >
          <Typography textTransform={'none'} fontSize={14}>
            Novo
          </Typography>
        </Button>
      </Box>
      <Divider color="gray" />
      <DataTable
        dense
        data={services ? services : []}
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
      />
    </Card>
  );
}

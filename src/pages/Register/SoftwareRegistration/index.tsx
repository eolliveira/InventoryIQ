import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import NoData from '../../../components/NoData';
import { Software } from '../../../types/Licenca/Software';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../../http/requests';
import IconButton from '@mui/material/IconButton';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function SoftwareRegistration() {
  const columns: TableColumn<Software>[] = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: (row) => row.nome,
      sortable: true,
    },
    { name: 'Fabricante', selector: (row) => row.fabricante },
    {
      button: true,
      width: '40px',
      sortable: true,
      cell: (row) => (
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => onEditSoftware(row.id)}
          size="small"
        >
          <EditTwoToneIcon color="primary" fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      button: true,
      width: '40px',
      cell: (row) => (
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => onDeleteSoftware(row.id)}
          size="small"
        >
          <DeleteTwoToneIcon color="error" fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  const [page, setPage] = useState<Software[]>();

  function onDeleteSoftware(softwareId: string) {}
  function onEditSoftware(softwareId: string) {}

  useEffect(() => {
    requestBackend({ url: '/software' })
      .then((response) => {
        setPage(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, []);

  return (
    <>
      <Box display={'flex'} justifyContent={'end'} marginTop={1}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 1 }}
          startIcon={<AddIcon />}
          //onClick={() => setOpenAddService(true)}
        >
          <Typography textTransform={'none'} fontSize={14}>
            Novo
          </Typography>
        </Button>
      </Box>

      <DataTable
        dense
        striped
        columns={columns}
        data={page ? page : []}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        fixedHeaderScrollHeight={'70vh'}
        selectableRows
        pointerOnHover
        highlightOnHover
        onRowClicked={() => {}}
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
    </>
  );
}

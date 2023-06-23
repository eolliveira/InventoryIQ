import { Software } from '../../../types/Licenca/Software';
import { useContext, useEffect, useState } from 'react';
import { requestBackend } from '../../../http/requests';
import { AxiosRequestConfig } from 'axios';
import { FormContext } from '../../../contexts/FormContext';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import NoData from '../../../components/NoData';
import IconButton from '@mui/material/IconButton';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import SoftwareModal from './SoftwareModal';
import Swal from 'sweetalert2';

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
          onClick={() => onEditSoftware(row)}
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

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [softwares, setSoftwares] = useState<Software[]>();
  const [data, setData] = useState<Software>();
  const [openSoftwareModal, setOpenSoftwareModal] = useState(false);

  function onAddSoftware() {
    setData(undefined);
    setFormContextData({ isAdding: true });
    setOpenSoftwareModal(true);
  }

  function onEditSoftware(software: Software) {
    setData(software);
    setFormContextData({ isEditing: true });
    setOpenSoftwareModal(true);
  }

  function onDeleteSoftware(softwareId: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: 'secondary',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/software/${softwareId}`,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido!',
              text: 'Registro foi removido com sucesso!.',
              icon: 'success',
              confirmButtonColor: '#999999',
            });

            setFormContextData({ isAdding: false });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonColor: '#999999',
            });
          });
      }
    });
  }

  useEffect(() => {
    requestBackend({ url: '/software' })
      .then((response) => setSoftwares(response.data))
      .catch((error) => console.log('Erro' + error));
  }, [formContextData]);

  return (
    <>
      <Box display={'flex'} justifyContent={'end'} marginTop={1}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 1 }}
          startIcon={<AddIcon />}
          onClick={() => onAddSoftware()}
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
        data={softwares ? softwares : []}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        selectableRows
        pointerOnHover
        highlightOnHover
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
      {openSoftwareModal && (
        <SoftwareModal
          data={data}
          openModal={openSoftwareModal}
          closeModal={() => setOpenSoftwareModal(false)}
        />
      )}
    </>
  );
}

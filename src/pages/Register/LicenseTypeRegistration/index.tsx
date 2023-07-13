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
import Swal from 'sweetalert2';
import { TipoLicenca } from '../../../types/Licenca/TipoLicenca';
import LicenseTypeModal from './LicenseTypeModal';

export default function LicenseTypeRegistration() {
  const columns: TableColumn<TipoLicenca>[] = [
    {
      name: 'Id',
      width: '100px',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: (row) => row.nome,
      compact: true,
      sortable: true,
    },
    { name: 'Descricão', width: '500px', selector: (row) => row.descricao },
    {
      button: true,

      sortable: true,
      cell: (row) => (
        <IconButton
          sx={{ marginRight: 5 }}
          onClick={() => onEditLicenseType(row)}
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
          onClick={() => onDeleteLicenseType(row.id)}
          size="small"
        >
          <DeleteTwoToneIcon color="error" fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [types, setTypes] = useState<TipoLicenca[]>();
  const [data, setData] = useState<TipoLicenca>();
  const [openLicenseTypeModal, setLicenseTypeModal] = useState(false);

  function onAddLicenseType() {
    setData(undefined);
    setFormContextData({ isAdding: true });
    setLicenseTypeModal(true);
  }

  function onEditLicenseType(tipo: TipoLicenca) {
    setData(tipo);
    setFormContextData({ isEditing: true });
    setLicenseTypeModal(true);
  }

  function onDeleteLicenseType(licenseTypeId: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'question',
      showCancelButton: true,
      //confirmButtonColor: '#dc3545',
      cancelButtonColor: 'secondary',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/licenseType/${licenseTypeId}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido!',
              text: 'Registro foi removido com sucesso!.',
              icon: 'success',
            });

            setFormContextData({ isAdding: false });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'error',
            });
          });
      }
    });
  }

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/licenseType',
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setTypes(response.data))
      .catch((error) => console.log('Erro' + error));
  }, [formContextData]);

  return (
    <>
      <Box display={'flex'} justifyContent={'end'} marginTop={1}>
        <Button
          size="small"
          variant="outlined"
          sx={{ marginRight: 1 }}
          onClick={() => onAddLicenseType()}
        >
          <AddIcon />
        </Button>
      </Box>

      <DataTable
        dense
        striped
        columns={columns}
        data={types ? types : []}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
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
      {openLicenseTypeModal && (
        <LicenseTypeModal
          data={data}
          openModal={openLicenseTypeModal}
          closeModal={() => setLicenseTypeModal(false)}
        />
      )}
    </>
  );
}

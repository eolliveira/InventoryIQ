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
import CircularLoading from '../../../components/Loaders/Progress';

export default function LicenseTypeRegistration() {
  const columns: TableColumn<TipoLicenca>[] = [
    { name: 'Id', width: '100px', sortable: true, selector: (row) => row.id },
    { name: 'Nome', sortable: true, selector: (row) => row.nome, compact: true },
    { name: 'Descricão', width: '500px', sortable: true, selector: (row) => row.descricao },
    {
      button: true,
      sortable: true,
      cell: (row) => (
        <IconButton sx={{ marginRight: 5 }} onClick={() => onEditLicenseType(row)} size="small">
          <EditTwoToneIcon color="primary" fontSize="inherit" />
        </IconButton>
      ),
    },
    {
      button: true,
      width: '40px',
      cell: (row) => (
        <IconButton sx={{ marginRight: 1 }} onClick={() => onDeleteLicenseType(row.id)} size="small">
          <DeleteTwoToneIcon color="error" fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [types, setTypes] = useState<TipoLicenca[]>();
  const [data, setData] = useState<TipoLicenca>();
  const [openLicenseTypeModal, setLicenseTypeModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      url: '/licenseType',
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setTypes(response.data))
      .catch((error) => console.log('Erro' + error))
      .finally(() => setIsLoading(false));
  }, [formContextData]);

  const onAddLicenseType = () => {
    setData(undefined);
    setFormContextData({ isAdding: true });
    setLicenseTypeModal(true);
  };

  const onEditLicenseType = (tipo: TipoLicenca) => {
    setData(tipo);
    setFormContextData({ isEditing: true });
    setLicenseTypeModal(true);
  };

  const onDeleteLicenseType = (licenseTypeId: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'question',
      showCancelButton: true,
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
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'end'} marginTop={1}>
        <Button size="small" variant="outlined" sx={{ marginRight: 1 }} onClick={() => onAddLicenseType()}>
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
        highlightOnHover
        progressPending={isLoading}
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
      {openLicenseTypeModal && (
        <LicenseTypeModal data={data} openModal={openLicenseTypeModal} closeModal={() => setLicenseTypeModal(false)} />
      )}
    </>
  );
}

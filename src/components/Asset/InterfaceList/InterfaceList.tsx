import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import CircularLoading from '../../Loaders/Progress';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import InterfaceForm from '../InterfaceForm';
import { Interface } from '../../../types/Interface';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import NoData from '../../NoData';

type InterfaceList = {
  assetId?: string;
};

export default function InterfaceList({ assetId }: InterfaceList) {
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
    {
      name: 'Mascara',
      selector: (row) => (row.mascaraSubRede ? row.mascaraSubRede : ' -'),
      sortable: true,
    },
    {
      name: 'Endereço Ip',
      selector: (row) => (row.enderecoIp ? row.enderecoIp : ' - '),
      sortable: true,
    },
    {
      name: 'Endereço Mac',
      selector: (row) => row.enderecoMac,
      sortable: true,
    },
    {
      button: true,
      width: '80px',
      cell: (row) => (
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => onDeleteInterface(row.id)}
          aria-label="delete"
          size="small"
        >
          <DeleteOutlineTwoToneIcon color="primary" fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [openAddInterface, setOpenAddInterface] = useState(false);
  const [isLoadingInterfaces, setIsLoadingInterfaces] = useState(false);
  const [listInterfaces, setListInterfaces] = useState<Interface[]>();

  const getInterfaces = useCallback(() => {
    setIsLoadingInterfaces(true);

    const params: AxiosRequestConfig = {
      url: `/asset/${assetId}/interfaces`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setListInterfaces(response.data);
      })
      .catch((error) => console.log('Erro ao carregar as interfaces: ' + error))
      .finally(() => setIsLoadingInterfaces(false));
  }, [assetId, formContextData]);

  useEffect(() => getInterfaces(), [getInterfaces]);

  function onDeleteInterface(interfaceId: string) {
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
          url: `/interface/${interfaceId}`,
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
              icon: 'success',
            });
          });
      }
    });
  }

  return (
    <Card
      sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }}
      variant="outlined"
    >
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
          Interfaces
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 1 }}
          startIcon={<AddIcon />}
          onClick={() => setOpenAddInterface(true)}
        >
          <Typography textTransform={'none'} fontSize={14}>
            Novo
          </Typography>
        </Button>
      </Box>
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
      {openAddInterface && (
        <InterfaceForm
          assetId={assetId}
          openModal={openAddInterface}
          closeModal={() => setOpenAddInterface(false)}
        />
      )}
    </Card>
  );
}

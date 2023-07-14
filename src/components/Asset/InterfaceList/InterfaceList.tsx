import NoData from '../../NoData';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { AxiosRequestConfig } from 'axios';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import InterfaceForm from '../InterfaceForm';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularLoading from '../../Loaders/Progress';
import { Interface } from '../../../types/Interface';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallback, useContext, useEffect, useState } from 'react';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

type InterfaceList = { assetId?: string };

export default function InterfaceList({ assetId }: InterfaceList) {
  const columns: TableColumn<Interface>[] = [
    {
      name: 'Nome',
      grow: 0.5,
      selector: (row) => (row.nomeLocal ? row.nomeLocal : ' - '),
    },
    {
      name: 'Fabricante',
      selector: (row) => (row.fabricante ? row.fabricante : ' - '),
    },
    {
      name: 'Mascara',
      selector: (row) => (row.mascaraSubRede ? row.mascaraSubRede : ' -'),
    },
    {
      name: 'Endereço Ip',
      selector: (row) => (row.enderecoIp ? row.enderecoIp : ' - '),
    },
    {
      name: 'Endereço Mac',
      selector: (row) => row.enderecoMac,
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
      .then((response) => setListInterfaces(response.data))
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
          size="small"
          variant="outlined"
          sx={{ marginRight: 1 }}
          onClick={() => setOpenAddInterface(true)}
        >
          <AddIcon />
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

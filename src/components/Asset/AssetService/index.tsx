import { useState, useEffect, useCallback, useContext } from 'react';
import Card from '@mui/material/Card';
import DataTable, { TableColumn } from 'react-data-table-component';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toCamelCase } from '../../../utils/StringConverter';
import { Servico } from '../../../types/Servico';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddServiceModal from '../../AddServiceModal';
import NoData from '../../NoData';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

type AssetServiceProps = {
  assetId?: string;
};

export default function AssetService({ assetId }: AssetServiceProps) {
  const columns: TableColumn<Servico>[] = [
    {
      name: 'Data serviço',
      selector: (row) => row.dhGerou,
      sortable: true,
      grow: 0.6,
    },
    {
      name: 'Tipo',
      selector: (row) => row.tipoServico,
      sortable: true,
    },
    {
      name: 'Usuário realizou',
      selector: (row) => toCamelCase(row.usuario.nome),
      sortable: true,
    },
    {
      name: 'Valor',
      selector: (row) => row.vlServico,
      sortable: true,
    },
    {
      button: true,
      width: '80px',
      cell: (row) => (
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => onDeleteService(row.id)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon color="primary" fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [services, setServices] = useState<Servico[]>();
  const [openAddService, setOpenAddService] = useState(false);

  const getServices = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${assetId}/services`,
    };

    requestBackend(params)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [assetId, formContextData]);

  useEffect(() => getServices(), [getServices]);

  function onDeleteService(serviceId: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: 'secondary',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/services/${serviceId}`,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire(
              'Removido!',
              'Registro foi removido com sucesso!.',
              'success'
            );
            setFormContextData({ isAdding: false });
          })
          .catch((error) => {
            Swal.fire('Erro!', `${error.response.data.message}`, 'success');
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
          Serviços realizados no ativo
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 1 }}
          startIcon={<AddIcon />}
          onClick={() => setOpenAddService(true)}
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
        data={services ? services : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
      />

      {openAddService && (
        <AddServiceModal
          assetId={assetId}
          openForm={openAddService}
          closeForm={() => setOpenAddService(false)}
        />
      )}
    </Card>
  );
}

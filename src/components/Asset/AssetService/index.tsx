import { useState, useEffect, useCallback, useContext } from 'react';
import Card from '@mui/material/Card';
import DataTable, { TableColumn } from 'react-data-table-component';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { removeUnderline, toCamelCase } from '../../../utils/StringConverter';
import { Servico } from '../../../types/Servico';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddServiceModal from '../AddServiceModal';
import NoData from '../../NoData';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import Swal from 'sweetalert2';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../utils/CurrencyConverter';

type AssetServiceProps = { assetId?: string };

export default function AssetService({ assetId }: AssetServiceProps) {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [services, setServices] = useState<Servico[]>();
  const [openAddService, setOpenAddService] = useState(false);

  const columns: TableColumn<Servico>[] = [
    { name: 'Data', selector: (row) => dayjs(row.dhGerou).format('DD/MM/YYYY'), sortable: true, grow: 0.4 },
    {
      button: true,
      cell: (row) => (
        <Tooltip title={row.descricao}>
          <MessageOutlinedIcon fontSize="small" color="primary" />
        </Tooltip>
      ),
    },
    { name: 'Tipo', sortable: true, selector: (row) => toCamelCase(removeUnderline(row.tipoServico)) },
    { name: 'Usuário realizou', sortable: true, selector: (row) => toCamelCase(row.usuario.nome) },
    {
      name: 'Valor',
      sortable: true,
      width: '90px',
      selector: (row) => (row.vlServico ? formatCurrency(String(row.vlServico)) : ``),
    },
    {
      button: true,
      width: '80px',
      cell: (row) => (
        <IconButton sx={{ marginRight: 1 }} onClick={() => onDeleteService(row.id)} aria-label="delete" size="small">
          <DeleteOutlineTwoToneIcon color="primary" fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const getServices = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/asset/${assetId}/services`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setServices(response.data))
      .catch((error) => console.log('Erro' + error));
  }, [assetId, formContextData]);

  useEffect(() => getServices(), [getServices]);

  const onDeleteService = (serviceId: string) => {
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
          url: `/services/${serviceId}`,
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
  };

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }} variant="outlined">
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography margin={2} fontSize={16} fontWeight={'bold'} letterSpacing={1} color={'primary'} variant="h2">
          Serviços realizados no ativo
        </Typography>
        <Button size="small" variant="outlined" sx={{ marginRight: 1 }} onClick={() => setOpenAddService(true)}>
          <AddIcon />
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
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
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
      {openAddService && (
        <AddServiceModal assetId={assetId} openModal={openAddService} closeModal={() => setOpenAddService(false)} />
      )}
    </Card>
  );
}

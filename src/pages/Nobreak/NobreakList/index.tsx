import { useNavigate } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { assetStatus } from '../../../constants/AssetStatus';
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import AssetStatusStyle from '../../../components/Asset/AssetStatusStyle';
import NoData from '../../../components/NoData';
import SearchBar from '../../../components/SearchBar';
import SelectFilter from '../../../components/SearchBar/Filters/SelectFilter';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Panel from '../../../components/Panel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormContext } from '../../../contexts/FormContext';
import CircularLoading from '../../../components/Loaders/Progress';
import DeleteIcon from '@mui/icons-material/Delete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Swal from 'sweetalert2';
import { Nobreak } from '../../../types/Nobreak';
import NobreakForm from '../NobreakData/NobreakForm';
import dayjs, { Dayjs } from 'dayjs';
import InputDatePeriod from '../../../components/inputs/InputDatePeriod';

const columns: TableColumn<Nobreak>[] = [
  {
    name: 'Nome',
    selector: (row) => row.nome,
    sortable: true,
  },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  {
    name: 'Local',
    selector: (row) =>
      row.localIndustria ? row.localIndustria.dsLocalIndustria : ' - ',
    sortable: true,
  },
  {
    name: 'Numero de Série',
    selector: (row) => (row.numeroSerie ? row.numeroSerie : ' - '),
    sortable: true,
  },
  {
    name: 'Status',
    sortable: true,
    cell: (row) => (
      <AssetStatusStyle key={row.id} size="small" status={row.status} />
    ),
  },
  {
    name: 'Dt.Aquisição',
    selector: (row) => dayjs(row.dtAquisicao).format('DD/MM/YYYY'),
    sortable: true,
  },
];

export default function NobreakList() {
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [page, setPage] = useState<SpringPage<Nobreak>>();
  const [inputFilter, setInputFilter] = useState('');
  const [numberPage, setNumberPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const navigate = useNavigate();

  const [filterField, setFilterField] = useState('nome');

  const [statusFilter, setStatusFilter] = useState('');
  const [statusFilterChecked, setStatusFilterchecked] = useState(false);

  const [dtAquisicaoInicioFilter, setDtAquisicaoInicioFilter] =
    useState<Dayjs | null>(null);
  const [dtAquisicaoFinalFilter, setDtAquisicaoFinalFilter] =
    useState<Dayjs | null>(null);
  const [dtAquisicaoFilterChecked, setDtAquisicaoFilterchecked] =
    useState(false);

  const [selectedAsset, setSelectedAsset] = useState('');

  const [openNobreakForm, setOpenNobreakForm] = useState(false);
  const [openCustomFilters, setOpenCustomFilters] =
    useState<null | HTMLElement>(null);
  const open = Boolean(openCustomFilters);

  function handleAddNobreak() {
    setFormContextData({ isAdding: true });
    setOpenNobreakForm(true);
  }

  function handleDeleteNobreak(AssetId: string) {
    if (selectedAsset == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione um ativo para remover!',
        icon: 'warning',
      });
      return;
    }

    setFormContextData({ isEditing: true });
    Swal.fire({
      title: `Deseja remover o ativo?`,
      text: 'Todas as informações e histórico de movimentos serão perdidas! ',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: `#dc3545`,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#4d4d4d',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/active/${AssetId}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido!',
              text: `Registro foi removido com sucesso!.`,
              icon: 'success',
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'warning',
            });
          })
          .finally(() => setFormContextData({ isEditing: false }));
      }
    });
  }

  function handleClearFilters() {
    setStatusFilterchecked(false);
    setDtAquisicaoFilterchecked(false);
    setInputFilter('');
    setStatusFilter('');
    setDtAquisicaoFinalFilter(null);
    setDtAquisicaoInicioFilter(null);
    setFilterField('nome');
  }

  const handleClose = () => setOpenCustomFilters(null);

  const handleRowClicked = (row: Nobreak) => navigate(`/nobreak/${row.id}`);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount == 1)
      setSelectedAsset(selectedRows.selectedRows[0].id);

    if (selectedRows.selectedCount == 0) setSelectedAsset('');
  };

  const getNobreakData = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/nobreak?${filterField}=${inputFilter}&status=${statusFilter}${
        dtAquisicaoInicioFilter
          ? `&dtAquisicaoInicio=${dayjs(dtAquisicaoInicioFilter).format(
              'DD/MM/YYYY'
            )}`
          : ''
      }${
        dtAquisicaoFinalFilter
          ? `&dtAquisicaoFinal=${dayjs(dtAquisicaoFinalFilter).format(
              'DD/MM/YYYY'
            )}`
          : ''
      }`,
      withCredentials: true,
      params: {
        page: numberPage,
        size: rowsPerPage,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [
    numberPage,
    rowsPerPage,
    formContextData,
    inputFilter,
    filterField,
    statusFilter,
    dtAquisicaoInicioFilter,
    dtAquisicaoFinalFilter,
  ]);

  useEffect(() => getNobreakData(), [getNobreakData]);

  return (
    <Panel title="Nobreaks">
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={2}
      >
        <Box display={'flex'} flexWrap={'wrap'} marginBottom={0.5}>
          <SearchBar
            inputFilter={inputFilter}
            setInputFilter={setInputFilter}
            setNumberPage={setNumberPage}
            onClearFilters={handleClearFilters}
            setOpenCustomFilters={setOpenCustomFilters}
          />
          <SelectFilter
            filterField={filterField}
            setFieldFilter={setFilterField}
            selectedItems={['nome', 'modelo', 'local', 'numeroSerie']}
          />

          {statusFilterChecked && (
            <SelectFilter
              label="Status"
              filterField={statusFilter}
              setFieldFilter={setStatusFilter}
              setNumberPage={setNumberPage}
              selectedItems={assetStatus.map((status) => status)}
            />
          )}
          {dtAquisicaoFilterChecked && (
            <InputDatePeriod
              label="Dt.aquisição"
              valueStart={dtAquisicaoInicioFilter}
              valueEnd={dtAquisicaoFinalFilter}
              onChangeStart={(date) => setDtAquisicaoInicioFilter(date)}
              onChangeEnd={(date) => setDtAquisicaoFinalFilter(date)}
            />
          )}
        </Box>
        <Stack direction={'row'} spacing={2}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="primary"
            onClick={() => handleDeleteNobreak(selectedAsset)}
          >
            <Typography fontSize={14} textTransform={'none'}>
              Excluir
            </Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            color="primary"
            onClick={handleAddNobreak}
          >
            <Typography fontSize={14} textTransform={'none'}>
              Novo
            </Typography>
          </Button>
        </Stack>
      </Box>
      <DataTable
        striped
        columns={columns}
        data={page ? page?.content : []}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        fixedHeaderScrollHeight={'68vh'}
        selectableRows
        pointerOnHover
        highlightOnHover
        onRowClicked={handleRowClicked}
        selectableRowsSingle
        onSelectedRowsChange={handleSelectedRowsChange}
        progressComponent={<CircularLoading />}
        customStyles={{
          headCells: {
            style: {
              fontWeight: 'bold',
              height: 50,
              fontSize: 13,
              letterSpacing: 0.5,
            },
          },
        }}
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
      <Stack
        display={'flex'}
        alignItems={'center'}
        direction={'row'}
        justifyContent={'end'}
        flexWrap={'wrap'}
        marginY={2}
        spacing={3}
      >
        <Typography fontSize={14} textTransform={'none'}>
          Linhas por página:
        </Typography>
        <Select
          variant="standard"
          size="small"
          sx={{ fontSize: 14 }}
          value={rowsPerPage}
          onChange={(event: SelectChangeEvent) => {
            setRowsPerPage(event.target.value);
          }}
        >
          <MenuItem sx={{ fontSize: 14 }} value={5}>
            5
          </MenuItem>
          <MenuItem sx={{ fontSize: 14 }} value={10}>
            10
          </MenuItem>
          <MenuItem sx={{ fontSize: 14 }} value={50}>
            50
          </MenuItem>
        </Select>
        <Pagination
          onChange={(event: ChangeEvent<unknown>, numberPage: number) =>
            setNumberPage(numberPage - 1)
          }
          defaultPage={1}
          count={page?.totalPages}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </Stack>
      <Menu
        sx={{ flexDirection: 'column' }}
        anchorEl={openCustomFilters}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          sx={{ marginRight: 2, padding: '0px 6px' }}
          onClick={handleClose}
        >
          <Checkbox
            size="small"
            checked={statusFilterChecked}
            onChange={(event) => setStatusFilterchecked(event.target.checked)}
          />
          <Typography fontSize={13} variant="subtitle2">
            Status
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ marginRight: 2, padding: '0px 6px' }}
          onClick={handleClose}
        >
          <Checkbox
            size="small"
            checked={dtAquisicaoFilterChecked}
            onChange={(event) =>
              setDtAquisicaoFilterchecked(event.target.checked)
            }
          />
          <Typography fontSize={13} variant="subtitle2">
            Data aquisição
          </Typography>
        </MenuItem>
      </Menu>
      {openNobreakForm && (
        <NobreakForm
          openForm={openNobreakForm}
          closeForm={() => setOpenNobreakForm(false)}
        />
      )}
    </Panel>
  );
}

import { useNavigate } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { assetStatus } from '../../../constants/AssetStatus';
import { Workstation } from '../../../types/Ativo/Workstation/Workstation';
import { ChangeEvent, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { toCamelCase } from '../../../utils/StringConverter';
import AssetStatusStyle from '../../../components/Asset/AssetStatusStyle';
import NoData from '../../../components/NoData';
import SearchBar from '../../../components/SearchBar';
import SelectFilter from '../../../components/SearchBar/Filters/SelectFilter';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Panel from '../../../components/Panel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WorkstationForm from '../WorkstationData/WorkstationForm';
import { FormContext } from '../../../contexts/FormContext';
import CircularLoading from '../../../components/Loaders/Progress';
import DeleteIcon from '@mui/icons-material/Delete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Swal from 'sweetalert2';
import InputDatePeriod from '../../../components/inputs/InputDatePeriod';
import dayjs, { Dayjs } from 'dayjs';

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Dominio', selector: (row) => row.dominio, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  {
    name: 'Atribuido a',
    selector: (row) => (row.usuario.nome ? toCamelCase(row.usuario.nome) : ' - '),
    sortable: true,
  },
  {
    name: 'Local',
    selector: (row) => (row.localIndustria ? row.localIndustria.dsLocalIndustria : ' - '),
    sortable: true,
  },
  { name: 'Status', sortable: true, cell: (row) => <AssetStatusStyle key={row.id} size="small" status={row.status} /> },
  {
    name: 'Dt.Aquisição',
    selector: (row) => (row.dtAquisicao ? dayjs(row.dtAquisicao).format('DD/MM/YYYY') : ' - '),
    sortable: true,
  },
];

export default function WorkstationList() {
  const navigate = useNavigate();
  const [numberPage, setNumberPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState('15');
  const [page, setPage] = useState<SpringPage<Workstation>>();
  const { formContextData, setFormContextData } = useContext(FormContext);

  const [openWorkstationForm, setOpenWorkstationForm] = useState(false);
  const [openCustomFilters, setOpenCustomFilters] = useState<null | HTMLElement>(null);
  const open = Boolean(openCustomFilters);

  const [selectedAsset, setSelectedAsset] = useState('');

  const [statusFilterChecked, setStatusFilterchecked] = useState(false);
  const [dtAquisicaoFilterChecked, setDtAquisicaoFilterchecked] = useState(false);

  const [filterField, setFilterField] = useState('nome');
  const [inputFilter, setInputFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dtAquisicaoInicioFilter, setDtAquisicaoInicioFilter] = useState<Dayjs | null>(null);
  const [dtAquisicaoFinalFilter, setDtAquisicaoFinalFilter] = useState<Dayjs | null>(null);

  const getWorkstatioData = useCallback(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation?${filterField}=${inputFilter}&status=${statusFilter}${
        dtAquisicaoInicioFilter ? `&dtAquisicaoInicio=${dayjs(dtAquisicaoInicioFilter).format('DD/MM/YYYY')}` : ''
      }${dtAquisicaoFinalFilter ? `&dtAquisicaoFinal=${dayjs(dtAquisicaoFinalFilter).format('DD/MM/YYYY')}` : ''}`,
      params: { page: numberPage, size: rowsPerPage },
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setPage(response.data))
      .catch((error) => console.log('Erro' + error))
      .finally(() => setIsLoading(false));
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

  useEffect(() => getWorkstatioData(), [getWorkstatioData]);

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenWorkstationForm(true);
  };

  const handleDelete = (AssetId: string) => {
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
          url: `/asset/${AssetId}`,
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
      setFormContextData({ isEditing: false });
    });
  };

  const handleSelectedRowsChange = (selectedRows: {
    selectedCount: number;
    selectedRows: { id: SetStateAction<string> }[];
  }) => {
    if (selectedRows.selectedCount == 1) setSelectedAsset(selectedRows.selectedRows[0].id);
    if (selectedRows.selectedCount == 0) setSelectedAsset('');
  };

  const handleClearFilters = () => {
    setStatusFilterchecked(false);
    setDtAquisicaoFilterchecked(false);
    setDtAquisicaoFinalFilter(null);
    setDtAquisicaoInicioFilter(null);
    setFilterField('nome');
    setInputFilter('');
    setStatusFilter('');
  };

  const handleRowClicked = (row: Workstation) => navigate(`/workstation/${row.id}`);
  const handleClose = () => setOpenCustomFilters(null);

  return (
    <Panel title="Estações de trabalho">
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
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
            selectedItems={['nome', 'dominio', 'fabricante', 'modelo', 'atribuido', 'local']}
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
        <Stack flexWrap={'wrap'} direction={'row'} spacing={2}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="primary"
            onClick={() => handleDelete(selectedAsset)}
          >
            <Typography fontSize={14} textTransform={'none'}>
              Excluir
            </Typography>
          </Button>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" onClick={handleAdd}>
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
        fixedHeaderScrollHeight={'70vh'}
        selectableRows
        pointerOnHover
        highlightOnHover
        onRowClicked={handleRowClicked}
        onSelectedRowsChange={handleSelectedRowsChange}
        selectableRowsSingle
        progressComponent={<CircularLoading />}
        progressPending={isLoading}
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
            setNumberPage(0);
          }}
        >
          <MenuItem sx={{ fontSize: 14 }} value={5}>
            5
          </MenuItem>
          <MenuItem sx={{ fontSize: 14 }} value={15}>
            15
          </MenuItem>
          <MenuItem sx={{ fontSize: 14 }} value={50}>
            50
          </MenuItem>
        </Select>
        <Pagination
          onChange={(event: ChangeEvent<unknown>, numberPage: number) => setNumberPage(numberPage - 1)}
          defaultPage={1}
          count={page?.totalPages}
          variant="outlined"
          shape="rounded"
          size="small"
        />
      </Stack>
      <Menu sx={{ flexDirection: 'column' }} anchorEl={openCustomFilters} open={open} onClose={handleClose}>
        <MenuItem sx={{ marginRight: 2, padding: '0px 6px' }} onClick={handleClose}>
          <Checkbox
            size="small"
            checked={statusFilterChecked}
            onChange={(event) => setStatusFilterchecked(event.target.checked)}
          />
          <Typography fontSize={13} variant="subtitle2">
            Status
          </Typography>
        </MenuItem>
        <MenuItem sx={{ marginRight: 2, padding: '0px 6px' }} onClick={handleClose}>
          <Checkbox
            size="small"
            checked={dtAquisicaoFilterChecked}
            onChange={(event) => setDtAquisicaoFilterchecked(event.target.checked)}
          />
          <Typography fontSize={13} variant="subtitle2">
            Data aquisição
          </Typography>
        </MenuItem>
      </Menu>
      {openWorkstationForm && (
        <WorkstationForm openForm={openWorkstationForm} closeForm={() => setOpenWorkstationForm(false)} />
      )}
    </Panel>
  );
}

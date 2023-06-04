import { useNavigate } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import { assetState } from '../../../constants/AssetState';
import { Workstation } from '../../../types/Workstation/Workstation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { toCamelCase } from '../../../utils/StringConverter';
import AssetStatusStyle from '../../../components/AssetStatusStyle';
import NoData from '../../../components/NoData';
import SerchBar from '../../../components/SearchBar';
import SelectFilter from '../../../components/SearchBar/Filters/SelectFilter';
import Panel from '../../../components/Panel';

const columns: TableColumn<Workstation>[] = [
  {
    name: 'Nome',
    selector: (row) => row.nome,
    sortable: true,
  },
  { name: 'Dominio', selector: (row) => row.dominio, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  {
    name: 'Atribuido a',
    selector: (row) =>
      row.usuario.nome ? toCamelCase(row.usuario.nome) : ' - ',
    sortable: true,
  },
  {
    name: 'Local',
    selector: (row) =>
      row.localIndustria ? row.localIndustria.dsLocalIndustria : ' - ',
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
    selector: (row) => row.dtAquisicao,
    sortable: true,
  },
];

export default function WorkstationList() {
  const [page, setPage] = useState<SpringPage<Workstation>>();
  const [inputFilter, setInputFilter] = useState('');
  const [numberPage, setNumberPage] = useState(0);
  const navigate = useNavigate();

  const [filterField, setFilterField] = useState('nome');
  const [statusFilter, setStatusFilter] = useState('');
  const [statusFilterChecked, setStatusFilterchecked] = useState(false);

  const [openCustomFilters, setOpenCustomFilters] =
    useState<null | HTMLElement>(null);
  const open = Boolean(openCustomFilters);

  const handleClose = () => {
    setOpenCustomFilters(null);
  };

  const getWorkstatioData = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation?${filterField}=${inputFilter}&status=${statusFilter}`,
      params: {
        page: numberPage,
        size: 50,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [numberPage, inputFilter, filterField, statusFilter]);

  useEffect(() => {
    getWorkstatioData();
  }, [getWorkstatioData]);

  const handleRowClicked = (row: Workstation) =>
    navigate(`/workstation/${row.id}`);

  function handleClearFilters() {
    setStatusFilterchecked(false);
    setInputFilter('');
    setStatusFilter('');
    setFilterField('nome');
  }

  return (
    <Panel title="Estação de Trabalho ">
      <Stack
        flexWrap={'wrap'}
        marginBottom={2}
        marginLeft={1}
        direction={'row'}
        spacing={1}
      >
        <SerchBar
          inputFilter={inputFilter}
          setInputFilter={setInputFilter}
          setNumberPage={setNumberPage}
          onClearFilters={handleClearFilters}
          setOpenCustomFilters={setOpenCustomFilters}
        />
        <SelectFilter
          filterField={filterField}
          setFieldFilter={setFilterField}
          selectedItems={['nome', 'fabricante', 'dominio']}
        />
        {statusFilterChecked && (
          <SelectFilter
            filterField={statusFilter}
            setFieldFilter={setStatusFilter}
            selectedItems={assetState.map((e) => e.value)}
          />
        )}
      </Stack>
      <DataTable
        dense
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
      />
      <Stack direction={'row'} justifyContent={'end'} marginY={2}>
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
      </Menu>
    </Panel>
  );
}

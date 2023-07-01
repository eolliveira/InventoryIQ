import { useNavigate } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
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
import NoData from '../../../components/NoData';
import SerchBar from '../../../components/SearchBar';
import SelectFilter from '../../../components/SearchBar/Filters/SelectFilter';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Panel from '../../../components/Panel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormContext } from '../../../contexts/FormContext';
import { Licenca } from '../../../types/Licenca/Licenca';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import LicenseForm from '../LicenseData/LicenseForm';
import { toDate } from '../../../utils/DateConverter';
import LicenseStatusStyle from '../../../components/LicenseStatusStyle';
import { licenseStatus } from '../../../constants/LicenseStatus';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const columns: TableColumn<Licenca>[] = [
  {
    name: 'Nome',
    selector: (row) => row.nome,
    sortable: true,
  },
  {
    name: 'Software',
    selector: (row) => row.software.nome,
    sortable: true,
  },
  { name: 'Chave', selector: (row) => row.chave, sortable: true },
  {
    name: 'Tipo Licença',
    selector: (row) => row.tpLicenca.nome,
    sortable: true,
  },
  {
    name: 'Status',
    sortable: true,
    cell: (row) => (
      <LicenseStatusStyle key={row.id} size="small" status={row.status} />
    ),
  },
  {
    name: 'Qtd. Adquirida',
    selector: (row) => row.qtdAdquirida,
    sortable: true,
    width: '140px',
  },
  {
    name: 'Qtd. Alocada',
    selector: (row) => row.qtdAlocada,
    sortable: true,
    width: '140px',
  },
  {
    name: 'Data expiração',
    selector: (row) => toDate(row.dtExpiracao),
    sortable: true,
    width: '145px',
  },
];

export default function LicenseList() {
  const { setFormContextData } = useContext(FormContext);
  const [page, setPage] = useState<SpringPage<Licenca>>();
  const [inputFilter, setInputFilter] = useState('');
  const [numberPage, setNumberPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const navigate = useNavigate();

  const [filterField, setFilterField] = useState('nome');
  const [statusFilter, setStatusFilter] = useState('');
  const [statusFilterChecked, setStatusFilterchecked] = useState(false);

  const [openCustomFilters, setOpenCustomFilters] =
    useState<null | HTMLElement>(null);
  const open = Boolean(openCustomFilters);

  const [openLicenseForm, setOpenLicenseForm] = useState(false);

  const getLicenses = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/licenses?${filterField}=${inputFilter}&status=${statusFilter}`,
      params: {
        page: numberPage,
        size: 10,
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

  const handleRowClicked = (row: Licenca) => navigate(`/license/${row.id}`);

  useEffect(() => {
    getLicenses();
  }, [getLicenses]);

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenLicenseForm(true);
  };

  function handleClearFilters() {
    setStatusFilterchecked(false);
    setInputFilter('');
    setStatusFilter('');
    setFilterField('nome');
  }

  const handleClose = () => {
    setOpenCustomFilters(null);
  };

  return (
    <Panel title="Licenças de Software">
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={2}
      >
        <Stack flexWrap={'wrap'} marginLeft={1} direction={'row'} spacing={1}>
          <SerchBar
            inputFilter={inputFilter}
            setInputFilter={setInputFilter}
            setNumberPage={setNumberPage}
            setOpenCustomFilters={setOpenCustomFilters}
            onClearFilters={handleClearFilters}
          />
          <SelectFilter
            filterField={filterField}
            setFieldFilter={setFilterField}
            selectedItems={['nome', 'chave', 'qtdAdquirida', 'qtdAlocada']}
          />
          {statusFilterChecked && (
            <SelectFilter
              label="Status"
              filterField={statusFilter}
              setFieldFilter={setStatusFilter}
              setNumberPage={setNumberPage}
              selectedItems={licenseStatus.map((status) => status)}
            />
          )}
        </Stack>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          color="primary"
          onClick={handleAdd}
        >
          <Typography fontSize={14} textTransform={'none'}>
            Novo
          </Typography>
        </Button>
      </Box>
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
          id="demo-simple-select"
          sx={{ fontSize: 14 }}
          size="small"
          value={rowsPerPage}
          onChange={(event: SelectChangeEvent) => {
            setRowsPerPage(event.target.value);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={50}>50</MenuItem>
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
      </Menu>
      {openLicenseForm && (
        <LicenseForm
          openForm={openLicenseForm}
          closeForm={() => setOpenLicenseForm(false)}
        />
      )}
    </Panel>
  );
}

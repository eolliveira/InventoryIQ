import { useNavigate } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { ChangeEvent, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import NoData from '../../../components/NoData';
import SearchBar from '../../../components/SearchBar';
import SelectFilter from '../../../components/SearchBar/Filters/SelectFilter';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Panel from '../../../components/Panel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormContext } from '../../../contexts/FormContext';
import { Licenca } from '../../../types/Licenca/Licenca';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../http/requests';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LicenseForm from '../LicenseData/LicenseForm';
import LicenseStatusStyle from '../../../components/LicenseStatusStyle';
import { licenseStatus } from '../../../constants/LicenseStatus';
import dayjs, { Dayjs } from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import InputDatePeriod from '../../../components/inputs/InputDatePeriod';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Software } from '../../../types/Licenca/Software';
import { TipoLicenca } from '../../../types/Licenca/TipoLicenca';
import Swal from 'sweetalert2';
import CircularLoading from '../../../components/Loaders/Progress';

const columns: TableColumn<Licenca>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Software', selector: (row) => row.software.nome, sortable: true },
  { name: 'Chave', selector: (row) => row.chave, sortable: true },
  { name: 'Tipo Licença', selector: (row) => row.tpLicenca.nome, sortable: true },
  {
    name: 'Status',
    sortable: true,
    cell: (row) => <LicenseStatusStyle key={row.id} size="small" status={row.status} />,
  },
  { name: 'Qtd. Adquirida', selector: (row) => row.qtdAdquirida, sortable: true, width: '140p x' },
  { name: 'Qtd. Alocada', selector: (row) => row.qtdAlocada, sortable: true, width: '140px' },
  {
    name: 'Data expiração',
    selector: (row) => (row.dtExpiracao ? dayjs(row.dtExpiracao).format('DD/MM/YYYY') : ' - '),
    sortable: true,
    width: '145px',
  },
];

export default function LicenseList() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [page, setPage] = useState<SpringPage<Licenca>>();
  const [numberPage, setNumberPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState('10');

  const [selectedLicense, setSelectedLicense] = useState('');

  const [openLicenseForm, setOpenLicenseForm] = useState(false);
  const [tpLicencaFilterChecked, setTpLicencaFilterchecked] = useState(false);
  const [softwareFilterChecked, setSoftwareFilterchecked] = useState(false);
  const [dtExpiracaoFilterChecked, setDtExpiracaoFilterchecked] = useState(false);
  const [statusFilterChecked, setStatusFilterchecked] = useState(false);

  const [inputFilter, setInputFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filterField, setFilterField] = useState('nome');
  const [dtExpiracaoInicioFilter, setDtExpiracaoInicioFilter] = useState<Dayjs | null>(null);
  const [dtExpiracaoFinalFilter, setDtExpiracaoFinalFilter] = useState<Dayjs | null>(null);

  const [openCustomFilters, setOpenCustomFilters] = useState<null | HTMLElement>(null);
  const open = Boolean(openCustomFilters);

  const [softwares, setSoftware] = useState<Software[]>();
  const [licenseTypes, setLicenseType] = useState<TipoLicenca[]>();
  const [tpLicencaId, settTpLicencaId] = useState('');
  const [softwareId, setSoftwareId] = useState('');

  const getLicenses = useCallback(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/licenses?${filterField}=${inputFilter}&status=${statusFilter}&softwareId=${softwareId}&tpLicencaId=${tpLicencaId}${
        dtExpiracaoInicioFilter ? `&dtExpiracaoInicio=${dayjs(dtExpiracaoInicioFilter).format('DD/MM/YYYY')}` : ''
      }${dtExpiracaoFinalFilter ? `&dtExpiracaoFinal=${dayjs(dtExpiracaoFinalFilter).format('DD/MM/YYYY')}` : ''}`,
      withCredentials: true,
      params: {
        page: numberPage,
        size: 10,
      },
    };

    requestBackend(params)
      .then((response) => setPage(response.data))
      .catch((error) => console.log('Erro' + error))
      .finally(() => setIsLoading(false));
  }, [
    numberPage,
    formContextData,
    inputFilter,
    filterField,
    softwareId,
    tpLicencaId,
    statusFilter,
    dtExpiracaoInicioFilter,
    dtExpiracaoFinalFilter,
  ]);

  useEffect(() => getLicenses(), [getLicenses]);

  const getSoftwares = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/software',
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setSoftware(response.data))
      .catch((error) => console.log('falha ao carregar softwares' + error));
  }, []);

  const getLicenseType = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: '/licenseType',
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setLicenseType(response.data))
      .catch((error) => console.log('falha ao carregar os tipos de software' + error));
  }, []);

  useEffect(() => {
    getSoftwares();
    getLicenseType();
  }, []);

  const handleRowClicked = (row: Licenca) => navigate(`/license/${row.id}`);

  const handleSelectedRowsChange = (selectedRows: {
    selectedCount: number;
    selectedRows: { id: SetStateAction<string> }[];
  }) => {
    if (selectedRows.selectedCount == 1) setSelectedLicense(selectedRows.selectedRows[0].id);
    if (selectedRows.selectedCount == 0) setSelectedLicense('');
  };

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenLicenseForm(true);
  };

  const onDelete = (licenseId: string) => {
    if (selectedLicense == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione uma licença para remover!',
        icon: 'warning',
      });
      return;
    }

    setFormContextData({ isEditing: true });
    Swal.fire({
      title: `Deseja remover a licença?`,
      text: 'Todas as informações serão perdidas! ',
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
          url: `/licenses/${licenseId}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removida!',
              text: `Licença foi removida com sucesso!.`,
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

  const handleClearFilters = () => {
    setStatusFilterchecked(false);
    setSoftwareFilterchecked(false);
    setTpLicencaFilterchecked(false);
    setDtExpiracaoFilterchecked(false);
    setInputFilter('');
    setStatusFilter('');
    setDtExpiracaoFinalFilter(null);
    setDtExpiracaoInicioFilter(null);
    setFilterField('nome');
    settTpLicencaId('');
  };

  const handleClose = () => setOpenCustomFilters(null);

  return (
    <Panel title="Licenças de software">
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'} marginBottom={2}>
        <Box display={'flex'} flexWrap={'wrap'} marginBottom={0.5}>
          <SearchBar
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
          {softwareFilterChecked && (
            <FormControl size="small">
              <InputLabel sx={{ fontSize: 14 }}>Software</InputLabel>
              <Select
                required
                label="Software"
                autoWidth
                value={softwareId}
                sx={{
                  minWidth: 100,
                  fontSize: 13,
                  borderRadius: 2,
                  marginRight: 0.5,
                }}
                onChange={(e) => setSoftwareId(e.target.value)}
              >
                {softwares?.map((software) => (
                  <MenuItem sx={{ fontSize: 13 }} key={software.id} value={software.id}>
                    {software.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {tpLicencaFilterChecked && (
            <FormControl size="small">
              <InputLabel sx={{ fontSize: 14 }}>Tipo</InputLabel>
              <Select
                required
                autoWidth
                label="Tipo"
                value={tpLicencaId}
                onChange={(e) => settTpLicencaId(e.target.value)}
                sx={{ minWidth: 100, fontSize: 13, borderRadius: 2, marginRight: 0.5 }}
              >
                {licenseTypes?.map((software) => (
                  <MenuItem sx={{ fontSize: 13 }} key={software.id} value={software.id}>
                    {software.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {statusFilterChecked && (
            <SelectFilter
              label="Status"
              filterField={statusFilter}
              setFieldFilter={setStatusFilter}
              setNumberPage={setNumberPage}
              selectedItems={licenseStatus.map((status) => status)}
            />
          )}
          {dtExpiracaoFilterChecked && (
            <InputDatePeriod
              label="Dt.expiração"
              valueStart={dtExpiracaoInicioFilter}
              valueEnd={dtExpiracaoFinalFilter}
              onChangeStart={(date) => setDtExpiracaoInicioFilter(date)}
              onChangeEnd={(date) => setDtExpiracaoFinalFilter(date)}
            />
          )}
        </Box>
        <Stack flexWrap={'wrap'} direction={'row'} spacing={2}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="primary"
            onClick={() => onDelete(selectedLicense)}
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
        onSelectedRowsChange={handleSelectedRowsChange}
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
            checked={softwareFilterChecked}
            onChange={(event) => setSoftwareFilterchecked(event.target.checked)}
          />
          <Typography fontSize={13} variant="subtitle2">
            Software
          </Typography>
        </MenuItem>
        <MenuItem sx={{ marginRight: 2, padding: '0px 6px' }} onClick={handleClose}>
          <Checkbox
            size="small"
            checked={tpLicencaFilterChecked}
            onChange={(event) => setTpLicencaFilterchecked(event.target.checked)}
          />
          <Typography fontSize={13} variant="subtitle2">
            Tipo licença
          </Typography>
        </MenuItem>
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
            checked={dtExpiracaoFilterChecked}
            onChange={(event) => setDtExpiracaoFilterchecked(event.target.checked)}
          />
          <Typography fontSize={13} variant="subtitle2">
            Data expiração
          </Typography>
        </MenuItem>
      </Menu>
      {openLicenseForm && <LicenseForm openForm={openLicenseForm} closeForm={() => setOpenLicenseForm(false)} />}
    </Panel>
  );
}

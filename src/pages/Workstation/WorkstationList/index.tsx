import { useNavigate } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import { BaseCard } from '../../../style/GlobalStyles';
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
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { toCamelCase } from '../../../utils/StringConverter';
import AssetStatusStyle from '../../../components/AssetStatusStyle';
import NoData from '../../../components/NoData';
import SerchBar from '../../../components/SearchBar';

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
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
  const [openCustomFilters, setOpenCustomFilters] =
    useState<null | HTMLElement>(null);
  const open = Boolean(openCustomFilters);

  const handleClose = () => {
    setOpenCustomFilters(null);
  };

  const [numberPage, setNumberPage] = useState(0);
  const [inputFilter, setInputFilter] = useState('');
  const [status, setStatus] = useState('');
  const [fieldFilter, setFieldFilter] = useState('nome');
  const [page, setPage] = useState<SpringPage<Workstation>>();
  const navigate = useNavigate();

  const [filterStatechecked, setFilterStatechecked] = useState(false);

  const getWorkstatioData = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation?${fieldFilter}=${inputFilter}&status=${status}`,
      params: {
        page: numberPage,
        size: 5,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [numberPage, inputFilter, fieldFilter, status]);

  useEffect(() => {
    getWorkstatioData();
  }, [getWorkstatioData]);

  const handleRowClicked = (row: Workstation) =>
    navigate(`/workstation/${row.id}`);

  function handleClearFilters() {
    setFilterStatechecked(false);
    setInputFilter('');
    setStatus('');
    setFieldFilter('nome');
  }

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack flexWrap={'wrap'} direction={'row'} spacing={2}>
          <SerchBar
            inputFilter={inputFilter}
            setInputFilter={setInputFilter}
            setNumberPage={setNumberPage}
            onClearFilters={handleClearFilters}
            setOpenCustomFilters={setOpenCustomFilters}
          />

          <Box style={{ width: 150 }}>
            <FormControl
              size="small"
              fullWidth
              style={{ backgroundColor: '#ffff' }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fieldFilter}
                onChange={(e) => {
                  setFieldFilter(e.target.value);
                }}
              >
                <MenuItem value={'nome'}>Nome</MenuItem>
                <MenuItem value={'fabricante'}>Fabricante</MenuItem>
                <MenuItem value={'dominio'}>Dominio</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {filterStatechecked && (
            <Box style={{ width: 150 }}>
              <FormControl
                fullWidth
                size="small"
                style={{ backgroundColor: '#ffff' }}
              >
                <InputLabel id="demo-multiple-chip-label">Status</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  label="Status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  {assetState.map((e) => (
                    <MenuItem value={e.value}>{e.desc}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Stack>

        <div>
          <Menu
            style={{ flexDirection: 'column' }}
            id="basic-menu"
            anchorEl={openCustomFilters}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              style={{ margin: 0, padding: '0px 6px' }}
              onClick={handleClose}
            >
              <Checkbox
                size="small"
                checked={filterStatechecked}
                onChange={(event) =>
                  setFilterStatechecked(event.target.checked)
                }
                inputProps={{
                  'aria-label': 'controlled',
                }}
              />
              <Typography variant="subtitle2">Status do ativo</Typography>
            </MenuItem>
          </Menu>
        </div>

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
      </Box>

      <BaseCard>
        <div>
          <DataTable
            dense
            striped
            columns={columns}
            data={page ? page?.content : []}
            sortIcon={<ExpandMoreIcon />}
            noDataComponent={<NoData />}
            responsive
            fixedHeader
            selectableRows
            pointerOnHover
            highlightOnHover
            onRowClicked={handleRowClicked}
            fixedHeaderScrollHeight={'82vh'}
          />
        </div>
      </BaseCard>
    </>
  );
}

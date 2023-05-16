import { useNavigate } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { SpringPage } from 'types/vendor/spring';
import { Workstation } from '../../../types/Workstation/Response/Workstation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BaseCard, Input } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';

import TuneIcon from '@mui/icons-material/Tune';
import { assetState } from '../../../constants/AssetState';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  { name: 'Status', selector: (row) => row.status, sortable: true },
  { name: 'Dt.Aquisição', selector: (row) => row.dtAquisicao, sortable: true },
];

interface Filter {
  name: string;
  checked: boolean;
}
export default function WorkstationList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<Filter[]>([
    { name: 'Filter 1', checked: false },
    { name: 'Filter 2', checked: false },
    { name: 'Filter 3', checked: false },
  ]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilterDiv, setShowFilterDiv] = useState<boolean>(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (filterName: string) => {
    const updatedFilters = [...selectedFilters];
    const index = updatedFilters.indexOf(filterName);
    if (index === -1) {
      updatedFilters.push(filterName);
    } else {
      updatedFilters.splice(index, 1);
    }
    setSelectedFilters(updatedFilters);
    setAnchorEl(null);
    setShowFilterDiv(updatedFilters.length > 0);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index].checked = !updatedFilters[index].checked;
    setFilters(updatedFilters);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // ///////
  const [numberPage, setNumberPage] = useState(0);
  const [inputFilter, setInputFilter] = useState('');
  const [status, setStatus] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');
  const [page, setPage] = useState<SpringPage<Workstation>>();
  const navigate = useNavigate();

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

  return (
    <>
      <h1>Teste</h1>
      <HeaderContainer>
        <Stack flexWrap={'wrap'} direction={'row'} spacing={2}>
          <Box
            minWidth={300}
            borderRadius={2}
            alignItems={'center'}
            display={'flex'}
            marginBottom={1}
            bgcolor={'#ffff'}
          >
            <SearchIcon color="primary" sx={{ margin: 1 }} fontSize="medium" />
            <input
              onChange={(e) => {
                setInputFilter(e.target.value);
                setNumberPage(0);
              }}
              value={inputFilter}
              style={{
                backgroundColor: 'unset',
                width: '100%',
                height: '100%',
                border: 'none',
                textDecoration: 'none',
                boxShadow: 'none',
                outline: 0,
              }}
            />

            <IconButton onClick={handleButtonClick}>
              <TuneIcon style={{ marginRight: 10 }} color="primary" />
            </IconButton>
          </Box>

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

          <Box style={{ width: 150 }}>
            <FormControl
              size="small"
              fullWidth
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
        </Stack>

        {/* ///   */}

        <>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {filters.map((filter, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuItemClick(filter.name)}
                sx={{ flexDirection: 'column' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  }
                  label={filter.name}
                />
              </MenuItem>
            ))}
          </Menu>
          {showFilterDiv && (
            <div>
              <Typography variant="h4" component="div">
                Selected Filters:
              </Typography>
              {selectedFilters.map((filter, index) => (
                <Typography key={index} variant="h5" component="div">
                  {filter}
                </Typography>
              ))}
            </div>
          )}
        </>

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
      </HeaderContainer>

      <BaseCard>
        <div>
          <DataTable
            dense
            columns={columns}
            data={page ? page?.content : []}
            sortIcon={<ExpandMoreIcon />}
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

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

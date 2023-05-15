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

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TuneIcon from '@mui/icons-material/Tune';
import InputLabel from '@mui/material/InputLabel';
import { assetState } from '../../../constants/AssetState';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Popover,
} from '@mui/material';

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  { name: 'Status', selector: (row) => row.status, sortable: true },
  { name: 'Dt.Aquisição', selector: (row) => row.dtAquisicao, sortable: true },
];

export default function WorkstationList() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value)
      );
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'checkbox-popover' : undefined;

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
            <TuneIcon style={{ marginRight: 10 }} color="primary" />
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

        {/* 
        
        */}

        <div>
          <Button variant="contained" onClick={handleClick}>
            Abrir lista de checkboxes
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItems.includes('item1')}
                      onChange={handleCheckboxChange}
                      value="item1"
                    />
                  }
                  label="Item 1"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItems.includes('item2')}
                      onChange={handleCheckboxChange}
                      value="item2"
                    />
                  }
                  label="Item 2"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItems.includes('item3')}
                      onChange={handleCheckboxChange}
                      value="item3"
                    />
                  }
                  label="Item 3"
                />
              </FormGroup>
            </FormControl>
          </Popover>
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

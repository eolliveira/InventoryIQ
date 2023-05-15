import { useNavigate } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { SpringPage } from 'types/vendor/spring';
import { Workstation } from '../../../types/Workstation/Response/Workstation';
import { ChangeEvent, useEffect, useState } from 'react';
import { BaseCard, Input } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TuneIcon from '@mui/icons-material/Tune';

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  { name: 'Status', selector: (row) => row.status, sortable: true },
  { name: 'Dt.Aquisição', selector: (row) => row.dtAquisicao, sortable: true },
];

export default function WorkstationList() {
  // evento botão

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [page, setPage] = useState<SpringPage<Workstation>>();
  const [numberPage, setNumberPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation`,
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
  }, [numberPage]);

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
            <TuneIcon style={{ marginRight: 10 }} color='primary' />
          </Box>

          <Box style={{ width: 200 }}>
            <FormControl size="small" fullWidth style={{ backgroundColor: '#ffff' }}>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
             
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

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



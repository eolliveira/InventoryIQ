import { useNavigate } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { ChangeEvent, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { SpringPage } from 'types/vendor/spring';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Stack } from '@mui/material';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import { Workstation } from '../../../types/Workstation';
import localeData from '../../../mocks/wokstationData.json'

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  { name: 'Status', selector: (row) => row.status, sortable: true },
  { name: 'Dt.Aquisição', selector: (row) => row.dtAquisicao, sortable: true },
];

export default function WorkstationList() {
 // const [page, setPage] = useState<SpringPage<Workstation>>();
  const [page, setPage] = useState<SpringPage<any>>();
  const [numberPage, setNumberPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(localeData)
    
    // const params: AxiosRequestConfig = {
    //   method: 'GET',
    //   url: `/workstation`,
    //   params: {
    //     page: numberPage,
    //     size: 5,
    //   },
    // };

    // requestBackend(params)
    //   .then((response) => {
    //     setPage(response.data);
    //   })
    //   .catch((error) => {
    //     console.log('Erro' + error);
    //   });
  }, [numberPage]);

  const handleRowClicked = (row: Workstation) => {
    navigate(`/workstation/${row.id}`);
  };

  return (
    <div className="App">
      <HeaderContainer>
        <Stack spacing={2}>
          <Pagination
            onChange={(event: ChangeEvent<unknown>, numberPage: number) => {
              console.log("teste");
              
              setNumberPage(numberPage - 1);
            }}
            defaultPage={1}
            count={page?.totalPages}
            variant="outlined"
            shape="rounded"
            size="small"
          />
        </Stack>
      </HeaderContainer>
      <Card>
        <DataTable
          columns={columns}
          data={page ? page?.content : []}
          sortIcon={<ExpandMoreIcon />}
          selectableRows
          pointerOnHover
          highlightOnHover
          dense
          fixedHeader
          onRowClicked={handleRowClicked}
        />
      </Card>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

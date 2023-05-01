import { useNavigate } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import { ChangeEvent, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { SpringPage } from 'types/vendor/spring';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import styled from 'styled-components';
import { Workstation } from '../../../types/Workstation';
import localeData from '../../../mocks/wokstationData.json';
import Stack from '@mui/material/Stack';
import Card from '@material-ui/core/Card';
import Pagination from '@mui/material/Pagination';

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
    setPage(localeData);

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
    <div>
      <HeaderContainer>
        <Stack spacing={2}>
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
      </HeaderContainer>
      <div>
        <DataTable
          columns={columns}
          data={page ? page?.content : []}
          sortIcon={<ExpandMoreIcon />}
          responsive
          selectableRows
          pointerOnHover
          highlightOnHover
          dense
          fixedHeader
          fixedHeaderScrollHeight={'82vh'}
          onRowClicked={handleRowClicked}
        />
      </div>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

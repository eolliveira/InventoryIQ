import styled from 'styled-components';
import { DataGrid, GridColDef, GridRowHeightParams } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../http/requests';
import { AxiosParams } from 'types/vendor/axios';
import { SpringPage } from 'types/vendor/spring';
import { workstation } from 'types/workstation';

export default function Workstation() {
  const [page, setPage] = useState<SpringPage<workstation>>();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (params: any) => {
    setCurrentPage(params.page);
  };

  const handleChangePageSize = (params: any) => {
    setPageSize(params.pageSize);
    setCurrentPage(0);
  };

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/workstation`,
      params: {
        page: 0,
        size: 12,
      },
    };

    axios(params)
      .then((response) => {
        setPage(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 250 },
    { field: 'nomeHost', headerName: 'Hostname', width: 150 },
    { field: 'modelo', headerName: 'Modelo', width: 200 },
    {
      field: 'fabricante',
      headerName: 'Fabricante',
      type: 'number',
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'string',
      width: 150,
    },
  ];

  const rows = [
    { id: 1, nome: 'Snow', modelo: 'Jon', fabricante: 35 },
    { id: 2, nome: 'Lannister', modelo: 'Cersei', fabricante: 42 },
    { id: 3, nome: 'Lannister', modelo: 'Jaime', fabricante: 45 },
    { id: 4, nome: 'Stark', modelo: 'Arya', fabricante: 16 },
    { id: 5, nome: 'Targaryen', modelo: 'Daenerys', fabricante: null },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Typography marginBottom={3} variant="h5" gutterBottom>
        Estação de Trabalho
      </Typography>

      <DataGrid
        rows={page?.content ?? []}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[25, 50, 100]}
        pagination
        rowCount={page?.totalElements}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        paginationMode="client"
        rowHeight={35}       
      />
    </div>
  );
}

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  background-color: #062152;
`;
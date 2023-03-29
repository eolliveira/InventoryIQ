import styled from 'styled-components';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { flexbox } from '@mui/system/Box';
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

  const handleChangePage = (params: any) => {
    setCurrentPage(params.page);
  };

  const handleChangePageSize = (params: any) => {
    setPageSize(params.pageSize);
    setCurrentPage(0);
  };

  useEffect(() => {
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/workstation`,
      params: {
        page: 0,
        size: 12,
      },
    };

    axios(params).then((response) => {
      setPage(response.data);
      console.log(response.data);
      
    });

    // axios
    //   .get(BASE_URL + '/workstation')
    //   .then((response) => {
    //     setPage(response.data);
    //   })
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 130 },
    { field: 'modelo', headerName: 'Modelo', width: 130 },
    {
      field: 'fabricante',
      headerName: 'Fabricante',
      type: 'number',
      width: 90,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
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
        pagination
        rowCount={page?.number}
        onPaginationModelChange={handleChangePage}
        //checkboxSelection
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

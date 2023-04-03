// import styled from 'styled-components';
// import { DataGrid, GridColDef, GridRowHeightParams } from '@mui/x-data-grid';
// import { Typography } from '@mui/material';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../../http/requests';
// import { AxiosParams } from 'types/vendor/axios';
// import { SpringPage } from 'types/vendor/spring';
// import { workstation } from 'types/workstation';

// export default function Workstation() {
//   const [page, setPage] = useState<SpringPage<workstation>>();

//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChangePage = (params: any) => {
//     setCurrentPage(params.page);
//   };

//   const handleChangePageSize = (params: any) => {
//     setPageSize(params.pageSize);
//     setCurrentPage(0);
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     const params: AxiosParams = {
//       method: 'GET',
//       url: `${BASE_URL}/workstation`,
//       params: {
//         page: 0,
//         size: 12,
//       },
//     };

//     axios(params)
//       .then((response) => {
//         setPage(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log('Erro' + error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, []);

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'nome', headerName: 'Nome', width: 250 },
//     { field: 'nomeHost', headerName: 'Hostname', width: 150 },
//     { field: 'modelo', headerName: 'Modelo', width: 200 },
//     {
//       field: 'fabricante',
//       headerName: 'Fabricante',
//       type: 'number',
//       width: 250,
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       type: 'string',
//       width: 150,
//     },
//   ];

//   const rows = [
//     { id: 1, nome: 'Snow', modelo: 'Jon', fabricante: 35 },
//     { id: 2, nome: 'Lannister', modelo: 'Cersei', fabricante: 42 },
//     { id: 3, nome: 'Lannister', modelo: 'Jaime', fabricante: 45 },
//     { id: 4, nome: 'Stark', modelo: 'Arya', fabricante: 16 },
//     { id: 5, nome: 'Targaryen', modelo: 'Daenerys', fabricante: null },
//   ];

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <Typography marginBottom={3} variant="h5" gutterBottom>
//         Estação de Trabalho
//       </Typography>

//       <DataGrid
//         rows={page?.content ?? []}
//         columns={columns}
//         loading={isLoading}
//         pageSizeOptions={[25, 50, 100]}
//         pagination
//         rowCount={page?.totalElements}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 12,
//             },
//           },
//         }}
//         paginationMode="client"
//         rowHeight={35}

//         onRowClick={(event, rowData) => {
//           const id = rowData;
//           console.log('ID do registro:', id);
//         }}

//       />
//     </div>
//   );
// }

// export const Wrapper = styled.div`
//   height: 100%;
//   width: 100%;
//   color: white;
//   background-color: #062152;
// `;

// export const Teste = styled.div`
//   .MuiDataGrid-cell:focus {
//   outline: none;
// }
// `;

//////

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { BASE_URL, requestBackend } from '../../http/requests';
import axios, { AxiosRequestConfig } from 'axios';
import { workstation } from 'types/workstation';
import { SpringPage } from 'types/vendor/spring';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pink } from '@mui/material/colors';
import { theme } from '../../style/Theme';


export default function WorkstationList() {
  const [page, setPage] = useState<SpringPage<workstation>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation`,
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params)
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

  return (
    <TableContainer component={Paper} sx={{ height: '100%' }}>
      <Table stickyHeader sx={{ minWidth: 650, '& td': { height: 35, padding:0}}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: `${theme.colors.primary}` }}>Id</TableCell>
            <TableCell style={{ backgroundColor: `${theme.colors.primary}` }} align="left">Nome</TableCell>
            <TableCell style={{ backgroundColor: `${theme.colors.primary}` }} align="left">Modelo</TableCell>
            <TableCell style={{ backgroundColor: `${theme.colors.primary}` }} align="left">Fabricante</TableCell>
            <TableCell style={{ backgroundColor: `${theme.colors.primary}` }} align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {page?.content.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': {backgroundColor: '#ebebeb'} }}
            >
              <TableCell align='center'> <StyledLink to={'/workstation/1'}>{row.id}</StyledLink></TableCell>
              <TableCell align="left"><StyledLink to={'/workstation/1'}>{row.nome}</StyledLink></TableCell>
              <TableCell align="left"><StyledLink to={'/workstation/1'}>{row.modelo}</StyledLink></TableCell>
              <TableCell align="left"><StyledLink to={'/workstation/1'}>{row.fabricante}</StyledLink></TableCell>
              <TableCell align="left"><StyledLink to={'/workstation/1'}>{row.status}</StyledLink></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;

  &:hover {
    text-decoration: underline;
    color: unset;
  }
`;
// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';
// import { BASE_URL, requestBackend } from '../../http/requests';
// import axios, { AxiosRequestConfig } from 'axios';
// import { workstation } from 'types/workstation';
// import { SpringPage } from 'types/vendor/spring';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { pink } from '@mui/material/colors';
// import { theme } from '../../style/Theme';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { log } from 'console';

// export default function WorkstationList() {
//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params: GridValueGetterParams) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//   ];

//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];

//   const [page, setPage] = useState<SpringPage<workstation>>();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     const params: AxiosRequestConfig = {
//       method: 'GET',
//       url: `/workstation`,
//       //withCredentials: true,
//       params: {
//         page: 0,
//         size: 12,
//       },
//     };

//     requestBackend(params)
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

//   return (
//     <TableContainer component={Paper} sx={{ height: '100%' }}>
//       <Table
//         stickyHeader
//         sx={{ minWidth: 650, '& td': { height: 35, padding: 0 } }}
//         aria-label="simple table"
//       >
//         <TableHead>
//           <TableRow>
//             <TableCell style={{ backgroundColor: `${theme.colors.primary}` }}>
//               Id
//             </TableCell>
//             <TableCell
//               style={{ backgroundColor: `${theme.colors.primary}` }}
//               align="left"
//             >
//               Nome
//             </TableCell>
//             <TableCell
//               style={{ backgroundColor: `${theme.colors.primary}` }}
//               align="left"
//             >
//               Modelo
//             </TableCell>
//             <TableCell
//               style={{ backgroundColor: `${theme.colors.primary}` }}
//               align="left"
//             >
//               Fabricante
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {page?.content.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{
//                 '&:last-child td, &:last-child th': { border: 0 },
//                 '&:hover': { backgroundColor: '#ebebeb' },
//               }}
//             >
//               <TableCell align="center">
//                 <StyledLink to={'/workstation/1'}>{row.id}</StyledLink>
//               </TableCell>
//               <TableCell align="left">
//                 <StyledLink to={'/workstation/1'}>{row.nome}</StyledLink>
//               </TableCell>
//               <TableCell align="left">
//                 <StyledLink to={'/workstation/1'}>{row.modelo}</StyledLink>
//               </TableCell>
//               <TableCell align="left">
//                 <StyledLink to={'/workstation/1'}>{row.fabricante}</StyledLink>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: unset;

//   &:hover {
//     text-decoration: underline;
//     color: unset;
//   }
// `;

//////////  teste
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import SortIcon from '@mui/icons-material/ArrowDownward';
import movies from './movies';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Directior',
    selector: 'director',
    sortable: true,
  },
  {
    name: 'Runtime (m)',
    selector: 'runtime',
    sortable: true,
    right: true,
  },
];

export default function WorkstationList() {
  const navigate = useNavigate();

  //passar tipo do dado
  const handleRowClicked = (row: { id: any }) => {
    console.log(row.id);
    navigate(`/workstation/${row.id}`);
  };

  return (
    <div className="App">
      <Card>
        <DataTable
          title="Estação de Trabalho"
          columns={columns}
          data={movies}
          defaultSortField="title"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
          pointerOnHover
          highlightOnHover
          onRowClicked={handleRowClicked}
        />
      </Card>
    </div>
  );
}

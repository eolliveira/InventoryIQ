import { useNavigate } from 'react-router-dom';
import { requestBackend } from '../../http/requests';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { SpringPage } from 'types/vendor/spring';
import { Workstation } from 'types/Workstation';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';

const columns: TableColumn<Workstation>[] = [
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Modelo', selector: (row) => row.modelo, sortable: true },
  { name: 'Status', selector: (row) => row.status, sortable: true },
  { name: 'Dt.Aquisição', selector: (row) => row.dtAquisicao, sortable: true },
];

export default function WorkstationList() {
  const [page, setPage] = useState<SpringPage<Workstation>>();
  const navigate = useNavigate();

  useEffect(() => {
    getWorkstation(0);
  }, []);

  const getWorkstation = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/workstation`,
      params: {
        page: pageNumber,
        size: 3,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  };

  const handleRowClicked = (row: Workstation) => {
    console.log(row.id);
    navigate(`/workstation/${row.id}`);
  };

  return (
    <div className="App">
      <Card>
        {/* <Pagination
          pageCount={page ? page.totalPages : 0}
          range={0}
          onChange={getWorkstation}
        />  */}
        <DataTable
          title="Estação de Trabalho"
          columns={columns}
          data={page ? page?.content : []}
          sortIcon={<ExpandMoreIcon />}
          selectableRows
          pointerOnHover
          highlightOnHover
          onRowClicked={handleRowClicked}

          pagination
          //paginationTotalRows={page?.numberOfElements}
          //onChangePage={handlePageChange}
          //paginationPerPage={5}
          // paginationTotalRows={page?.numberOfElements}
          // paginationRowsPerPageOptions={[5,25,50,100,300]}
        />
      </Card>
    </div>
  );
}

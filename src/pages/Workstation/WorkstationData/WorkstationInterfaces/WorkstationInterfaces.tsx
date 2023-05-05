import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { SpringPage } from 'types/vendor/spring';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Card from '@material-ui/core/Card';
import Pagination from '@mui/material/Pagination';
import { Interface } from '../../../../types/Interface';
import { requestBackend } from '../../../../http/requests';

type WorkstationInterfacesProps = {
  workstationId?: string;
};

const columns: TableColumn<Interface>[] = [
  { name: 'Nome', selector: (row) => row.nomeLocal, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Mascara', selector: (row) => row.mascaraSubRede, sortable: true },
  { name: 'Endereço Ip', selector: (row) => row.enderecoIp, sortable: true },
  { name: 'Endereço Mac', selector: (row) => row.enderecoMac, sortable: true },
];

export default function WorkstationInterfaces({
  workstationId,
}: WorkstationInterfacesProps) {
  const [list, setList] = useState<Interface[]>();

  const getInterfaces = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${workstationId}/interfaces`,
    };

    requestBackend(params)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log('Erro' + error);
      });
  }, [workstationId]);

  useEffect(() => {
    getInterfaces();
  }, [getInterfaces]);

  const handleRowClicked = () => {};

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          data={list ? list : []}
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
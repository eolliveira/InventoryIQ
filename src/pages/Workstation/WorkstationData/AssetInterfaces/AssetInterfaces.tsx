import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
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
  const [listInterfaces, setListInterfaces] = useState<Interface[]>();

  const getInterfaces = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/active/${workstationId}/interfaces`,
    };

    requestBackend(params)
      .then((response) => {
        setListInterfaces(response.data);
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
    <DataTable
      dense
      data={listInterfaces ? listInterfaces : []}
      columns={columns}
      sortIcon={<ExpandMoreIcon />}
      responsive
      fixedHeader
      selectableRows
      pointerOnHover
      highlightOnHover
      fixedHeaderScrollHeight={'82vh'}
      onRowClicked={handleRowClicked}
    />
  );
}

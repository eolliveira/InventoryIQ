import { BaseCard } from '../../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import { Usuario } from 'types/Usuario';

import Box from '@mui/material/Box';
import CustomModal from '../../CustomModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DataTable, { TableColumn } from 'react-data-table-component';
import SerchBar from '../../../components/SearchBar';
import NoData from '../../../components/NoData';
import Panel from '../../../components/Panel';

type ChangeUserModalProps = {
  assetId?: string;
  openForm: boolean;
  closeForm: () => void;
};

const columns: TableColumn<Usuario>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true },
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Email', selector: (row) => row.email, sortable: true },
];

export default function ChangeUserModal({
  assetId,
  openForm,
  closeForm,
}: ChangeUserModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [users, setUsers] = useState<Usuario[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    requestBackend({ url: `/users?nome=${inputFilter}` })
      .then((response) => {
        setUsers(response.data.content);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) {
      setSelectedUser(selectedRows.selectedRows[0].id);
    }
  };

  function handleConfirm() {
    if (selectedUser == '') {
      window.alert('Selecione um usuario');
      return;
    }

    const data = { usuarioId: selectedUser };

    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/active/${assetId}/user/update`,
      data: data,
    };
    requestBackend(params)
      .then(() => {
        setFormContextData({ isEditing: false });
        closeForm();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancel() {
    setFormContextData({ isEditing: false });
    closeForm();
  }

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title="Atribuir usuário">
          <Stack height={500} width={850}>
            <Stack direction={'row'}>
              <SerchBar
                inputFilter={inputFilter}
                setInputFilter={setInputFilter}
              />
            </Stack>
            <DataTable
              columns={columns}
              data={users ? users : []}
              dense
              striped
              responsive
              fixedHeader
              noDataComponent={<NoData />}
              sortIcon={<ExpandMoreIcon />}
              fixedHeaderScrollHeight={'62vh'}
              pointerOnHover
              highlightOnHover
              selectableRows
              selectableRowsSingle
              onSelectedRowsChange={handleSelectedRowsChange}
            />
          </Stack>
          <Box display={'flex'} justifyContent={'end'}>
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleCancel}
            >
              <Typography textTransform={'none'}>Cancelar</Typography>
            </Button>
            <LoadingButton
              color="success"
              loading={false}
              loadingPosition="start"
              startIcon={<CheckIcon />}
              variant="contained"
              onClick={handleConfirm}
              style={{ marginLeft: 10 }}
            >
              <Typography textTransform={'none'}>Confirmar</Typography>
            </LoadingButton>
          </Box>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

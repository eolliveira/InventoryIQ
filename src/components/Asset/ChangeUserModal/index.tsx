import { BaseCard } from '../../../style/GlobalStyles';
import { SetStateAction, useContext, useEffect, useState } from 'react';
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
import SearchBar from '../../../components/SearchBar';
import NoData from '../../../components/NoData';
import Panel from '../../../components/Panel';
import Swal from 'sweetalert2';
import CircularLoading from '../../../components/Loaders/Progress';
import { Container } from './style';

type ChangeUserModalProps = {
  assetId?: string;
  openForm: boolean;
  closeForm: () => void;
};

const columns: TableColumn<Usuario>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true, width: '125px' },
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Email', selector: (row) => row.email, sortable: true },
];

export default function ChangeUserModal({ assetId, openForm, closeForm }: ChangeUserModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [users, setUsers] = useState<Usuario[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      url: `/users?nome=${inputFilter}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setUsers(response.data.content))
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: {
    selectedCount: number;
    selectedRows: { id: SetStateAction<string> }[];
  }) => {
    if (selectedRows.selectedCount != 0) setSelectedUser(selectedRows.selectedRows[0].id);
    if (selectedRows.selectedCount == 0) setSelectedUser('');
  };

  const handleConfirm = () => {
    if (selectedUser == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione um usuario!',
        icon: 'warning',
      });
      return;
    }

    const data = { usuarioId: selectedUser };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/asset/${assetId}/user/update`,
      data: data,
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        setFormContextData({ isEditing: false });
        closeForm();
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setFormContextData({ isEditing: false });
    closeForm();
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title="Atribuir usuário">
          <Container>
            <Stack height={500}>
              <Stack direction={'row'}>
                <SearchBar placeholder="Nome..." inputFilter={inputFilter} setInputFilter={setInputFilter} />
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
                highlightOnHover
                selectableRows
                selectableRowsSingle
                onSelectedRowsChange={handleSelectedRowsChange}
                progressPending={isLoading}
                progressComponent={<CircularLoading />}
                customStyles={{
                  headCells: {
                    style: {
                      fontWeight: 'bold',
                      height: 30,
                      fontSize: 13,
                      letterSpacing: 0.5,
                    },
                  },
                }}
              />
            </Stack>
            <Box marginTop={2} display={'flex'} justifyContent={'end'}>
              <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={handleCancel}>
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
          </Container>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

import { BaseCard } from '../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../http/requests';
import { FormContext } from '../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import { ButtonContainer, TextButton } from './ChangeUserModal.style';
import Box from '@mui/material/Box';
import CustomModal from '../CustomModal/CustomModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@material-ui/core/Typography';
import DataTable, { TableColumn } from 'react-data-table-component';
import SearchIcon from '@mui/icons-material/Search';
import { Usuario } from 'types/Usuario';

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

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) {
      setSelectedUser(selectedRows.selectedRows[0].id);
    }
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/users?nome=${inputFilter}`,
    };
    requestBackend(params)
      .then((response) => {
        setUsers(response.data.content);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }, [inputFilter]);

  function handleConfirm() {
    if (selectedUser == '') {
      window.alert('Selecione um usuario');
      return;
    }

    const data = { usuarioId: selectedUser };

    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/workstation/${assetId}/user/update`,
      data: data,
    };
    requestBackend(params)
      .then(() => {
        window.alert('Status do ativo foi alterado com sucesso!');
        setFormContextData({ isEditing: false });
        closeForm();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }

  function handleCancel() {
    setFormContextData({ isEditing: false });
    closeForm();
  }

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Stack padding={2}>
          <Typography variant="h6"> Atribuir usuário </Typography>
          <Stack height={500} width={850}>
            <Stack direction={'row'}>
              <Box
                maxWidth={'100%'}
                height={35}
                borderRadius={2}
                border={'1px solid red'}
                alignItems={'center'}
                display={'flex'}
                marginBottom={1}
                bgcolor={'#ffff'}
              >
                <SearchIcon
                  color="primary"
                  sx={{ margin: 1 }}
                  fontSize="medium"
                />
                <input
                  onChange={(e) => {
                    setInputFilter(e.target.value);
                  }}
                  value={inputFilter}
                  style={{
                    backgroundColor: 'unset',
                    width: '100%',
                    height: '100%',
                    fontSize: '13px',
                    border: 'none',
                    textDecoration: 'none',
                    boxShadow: 'none',
                    outline: 0,
                  }}
                />
              </Box>
            </Stack>

            <DataTable
              columns={columns}
              data={users ? users : []}
              dense
              striped
              responsive
              fixedHeader
              sortIcon={<ExpandMoreIcon />}
              fixedHeaderScrollHeight={'62vh'}
              pointerOnHover
              highlightOnHover
              selectableRows
              selectableRowsSingle
              onSelectedRowsChange={handleSelectedRowsChange}
            />
          </Stack>

          <ButtonContainer>
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleCancel}
            >
              <TextButton>Cancelar</TextButton>
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
              <TextButton>Confirmar</TextButton>
            </LoadingButton>
          </ButtonContainer>
        </Stack>
      </BaseCard>
    </CustomModal>
  );
}

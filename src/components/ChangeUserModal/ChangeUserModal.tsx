import { BaseCard, Label } from '../../style/GlobalStyles';
import { theme } from '../../style/Theme';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../http/requests';
import { FormContext } from '../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import { ButtonContainer, TextButton } from './ChangeUserModal.style';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomModal from '../CustomModal/CustomModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';
import { assetState } from '../../constants/AssetState';
import DataTable, { TableColumn } from 'react-data-table-component';
import TuneIcon from '@mui/icons-material/Tune';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import { Usuario } from 'types/Usuario';

const columns: TableColumn<Usuario>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true },
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Email', selector: (row) => row.email, sortable: true },
];

type ChangeStateProps = {
  assetId?: string;
  openForm: boolean;
  closeForm: () => void;
};

export default function ChangeUserModal({
  assetId,
  openForm,
  closeForm,
}: ChangeStateProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [inputFilter, setInputFilter] = useState('');

  ////
  const { setFormContextData } = useContext(FormContext);
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  const [users, setUsers] = useState<Usuario[]>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/users?nome=${inputFilter}`,
    };
    requestBackend(params)
      .then((response) => {
        console.log(response.data.content);
        //setFormContextData({ isEditing: false });
        setUsers(response.data.content);
        //closeForm();
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }, [inputFilter]);

  function handleSave() {
    // const data = {
    //   statusAtivo: state,
    //   descricao: description,
    //   ativoId: assetId,
    //   //deve obter o id do usuário logado
    //   usuarioId: 6566,
    // };
    // const params: AxiosRequestConfig = {
    //   method: 'GET',
    //   url: '/movement',
    //   data: data,
    //   withCredentials: false,
    // };
    // requestBackend(params)
    //   .then(() => {
    //     window.alert('Status do ativo foi alterado com sucesso!');
    //     setFormContextData({ isEditing: false });
    //     closeForm();
    //   })
    //   .catch((error) => {
    //     window.alert(error.response.data.message);
    //   });
  }

  function handleCancel() {
    setFormContextData({ isEditing: false });
    closeForm();
  }

  const userData = [
    {
      id: '1845',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
    {
      id: '185',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
    {
      id: '845',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
    {
      id: '184',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
    {
      id: '1869334',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
    {
      id: '56',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
    {
      id: '184535',
      nome: 'Erick Oliveira Rosa',
      email: 'erickoliveira@ajrorato.ind.br',
    },
  ];

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Stack padding={2}>
          <Stack height={500} width={850}>
            <Stack direction={'row'}>
              <Box
                maxWidth={'100%'}
                borderRadius={2}
                border={'1px solid blue'}
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

                <IconButton
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <TuneIcon fontSize="small" color="primary" />
                </IconButton>
              </Box>
            </Stack>

            <DataTable
              dense
              columns={columns}
              data={users ? users : []}
              responsive
              fixedHeader
              selectableRows
              sortIcon={<ExpandMoreIcon />}
              pointerOnHover
              highlightOnHover
              onRowClicked={() => {}}
              fixedHeaderScrollHeight={'62vh'}
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
              onClick={() => {}}
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

import { BaseCard } from '../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../http/requests';
import { FormContext } from '../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import { ButtonContainer, TextButton } from './ChangeNfEntradaModal.style';
import { LocalIndustria } from 'types/LocalIndustria';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CustomModal from '../CustomModal/CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { NotaFiscalEntrada } from 'types/NotaFiscalEntrada/NotaFiscalEntrada';

type ChangeNfEntradaModalProps = {
  assetId?: string;
  openForm: boolean;
  closeForm: () => void;
};

const columns: TableColumn<NotaFiscalEntrada>[] = [
  { name: 'Cod. Pessoa', selector: (row) => row.pessoa.id, sortable: true },
  {
    name: 'Razão Social',
    selector: (row) => row.pessoa.razaoSocial,
    sortable: true,
    width: '30%',
  },
  {
    name: 'Numero da Nota',
    selector: (row) => row.nrNotaFiscal,
    sortable: true,
  },
  { name: 'Data de Emissão', selector: (row) => row.dtEmissao, sortable: true },
  { name: 'Data de Entrada', selector: (row) => row.dtEntrada, sortable: true },
  {
    name: 'Valor da Nota',
    selector: (row) => row.valorNotaFiscal,
    sortable: true,
  },
];

export default function ChangeNfEntradaModal({
  assetId,
  openForm,
  closeForm,
}: ChangeNfEntradaModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<NotaFiscalEntrada[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedNfEntrada, setSelectedNfEntrada] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/nfEntrada?NrNotaFiscal=${inputFilter}`,
    };
    requestBackend(params)
      .then((response) => {
        setNotes(response.data.content);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) {
      setSelectedNfEntrada(selectedRows.selectedRows[0].idNfEntrada);
    }
  };

  function handleConfirm() {
    if (selectedNfEntrada == '') {
      window.alert('Selecione uma Nota');
      return;
    }
    const data = { idNfEntrada: selectedNfEntrada };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/active/${assetId}/nfEntrada/update`,
      data: data,
    };
    requestBackend(params)
      .then(() => {
        window.alert('Nota Fiscal de Entrada foi atribuida com sucesso!');
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
          <Typography variant="h6">Atribuir Nota Fiscal de entrada </Typography>
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
                  type="number"
                  className="no-spinner"
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

            {isLoading ? (
              <Box
                height={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <CircularProgress />
              </Box>
            ) : (
              <DataTable
                columns={columns}
                data={notes ? notes : []}
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
            )}
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

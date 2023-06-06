import { BaseCard } from '../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../http/requests';
import { FormContext } from '../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';

import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CustomModal from '../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import { NotaFiscalEntrada } from 'types/NotaFiscalEntrada/NotaFiscalEntrada';
import SerchBar from '../../components/SearchBar';
import CircularLoading from '../Loaders/Progress';
import Panel from '../../components/Panel';
import Swal from 'sweetalert2';

type ChangeNfEntradaModalProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
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
  openModal: openForm,
  closeModal: closeForm,
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
      Swal.fire({
        title: 'Atenção!',
        text: 'Selecione uma Nota Fiscal!',
        icon: 'warning',
      });
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
        <Panel title="Vincular Licença">
          <Stack height={500} width={850}>
            <Stack direction={'row'}>
              <SerchBar
                inputFilter={inputFilter}
                setInputFilter={setInputFilter}
              />
            </Stack>
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
              progressPending={isLoading}
              progressComponent={<CircularLoading />}
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

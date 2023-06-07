import { BaseCard } from '../../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import { LocalIndustria } from 'types/LocalIndustria';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CustomModal from '../../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import NoData from '../../NoData';
import SerchBar from '../../../components/SearchBar';
import Panel from '../../../components/Panel';
import Swal from 'sweetalert2';

type ChangeLocationModalProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<LocalIndustria>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true },
  { name: 'Nome', selector: (row) => row.dsLocalIndustria, sortable: true },
];

export default function ChangeLocationModal({
  assetId,
  openModal,
  closeModal: closeForm,
}: ChangeLocationModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [locations, setLocations] = useState<LocalIndustria[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    requestBackend({ url: `/IndustrySite?dsLocalIndustria=${inputFilter}` })
      .then((response) => setLocations(response.data))
      .catch((error) => window.alert(error.response.data.message));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) {
      setSelectedLocation(selectedRows.selectedRows[0].id);
    }
  };

  function handleConfirm() {
    if (selectedLocation == '') {
      Swal.fire({
        title: 'Atenção!',
        text: 'Selecione um Local da Industria!',
        icon: 'warning',
      });
      return;
    }
    const data = { localIndustriaId: selectedLocation };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/active/${assetId}/location/update`,
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
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Atribuir local">
          <Stack height={500} width={850}>
            <Stack direction={'row'}>
              <SerchBar
                inputFilter={inputFilter}
                setInputFilter={setInputFilter}
              />
            </Stack>
            <DataTable
              columns={columns}
              data={locations ? locations : []}
              dense
              striped
              responsive
              fixedHeader
              sortIcon={<ExpandMoreIcon />}
              fixedHeaderScrollHeight={'62vh'}
              noDataComponent={<NoData />}
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

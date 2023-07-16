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
import SearchBar from '../../../components/SearchBar';
import Panel from '../../../components/Panel';
import Swal from 'sweetalert2';
import { Container } from './style';
import CircularLoading from '../../../components/Loaders/Progress';

type ChangeLocationModalProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<LocalIndustria>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true, width: '125px' },
  { name: 'Nome', selector: (row) => row.dsLocalIndustria, sortable: true },
  {
    name: 'Centro de custo',
    selector: (row) => (row.centroCusto ? row.centroCusto.id + ' - ' + row.centroCusto.descricaoCentroCusto : ' - '),
    sortable: true,
  },
];

export default function ChangeLocationModal({ assetId, openModal, closeModal: closeForm }: ChangeLocationModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [locations, setLocations] = useState<LocalIndustria[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      url: `/IndustrySite?dsLocalIndustria=${inputFilter}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setLocations(response.data))
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) setSelectedLocation(selectedRows.selectedRows[0].id);
    if (selectedRows.selectedCount == 0) setSelectedLocation('');
  };

  const handleConfirm = () => {
    if (selectedLocation == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione um Local para atribuir!',
        icon: 'warning',
      });

      return;
    }

    const data = { localIndustriaId: selectedLocation };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/asset/${assetId}/location/update`,
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
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Atribuir local">
          <Container>
            <Stack height={500}>
              <Stack direction={'row'}>
                <SearchBar placeholder="Nome..." inputFilter={inputFilter} setInputFilter={setInputFilter} />
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
                progressComponent={<CircularLoading />}
                progressPending={isLoading}
                pointerOnHover
                highlightOnHover
                selectableRows
                selectableRowsSingle
                onSelectedRowsChange={handleSelectedRowsChange}
                customStyles={{
                  headCells: {
                    style: {
                      fontWeight: 'bold',
                      height: 40,
                      fontSize: 13,
                      letterSpacing: 0.5,
                    },
                  },
                }}
              />
            </Stack>
            <Box display={'flex'} marginTop={2} justifyContent={'end'}>
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

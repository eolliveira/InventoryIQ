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
import SearchIcon from '@mui/icons-material/Search';
import CustomModal from '../../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import NoData from '../../NoData';
import SerchBar from '../../../components/SearchBar';

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
      window.alert('Selecione um local da Industria');
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
        <Stack padding={2}>
          <Typography variant="h6"> Atribuir Local </Typography>
          <Stack height={500} width={850}>
            <Stack direction={'row'}>
              <SerchBar
                inputFilter={inputFilter}
                setInputFilter={setInputFilter}
              />

              {/* <Box
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
              </Box> */}
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
        </Stack>
      </BaseCard>
    </CustomModal>
  );
}

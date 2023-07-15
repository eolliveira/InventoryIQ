import { BaseCard } from '../../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../../http/requests';
import { FormContext } from '../../../contexts/FormContext';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CustomModal from '../../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import NoData from '../../NoData';
import { Licenca } from '../../../types/Licenca/Licenca';
import Swal from 'sweetalert2';
import SearchBar from '../../../components/SearchBar';
import Panel from '../../../components/Panel';
import { Container } from './style';

type AssetLinkLicenseProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<Licenca>[] = [
  { name: 'Id', width: '80px', selector: (row) => row.id },
  { name: 'Nome', width: '260px', selector: (row) => row.nome },
  { name: 'Software', width: '260px', selector: (row) => row.software.nome },
  { name: 'Tipo', selector: (row) => row.tpLicenca.nome },
  { name: 'Chave', selector: (row) => row.chave },
];

export default function AssetLinkLicense({ assetId, openModal, closeModal }: AssetLinkLicenseProps) {
  const { setFormContextData } = useContext(FormContext);
  const [licenses, setLicenses] = useState<Licenca[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('');

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/licenses?licencasDisponiveis=true&nome=${inputFilter}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setLicenses(response.data.content))
      .catch((error) => window.alert(error.response.data.message));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) setSelectedLicense(selectedRows.selectedRows[0].id);

    if (selectedRows.selectedCount == 0) setSelectedLicense('');
  };

  const handleConfirm = () => {
    if (selectedLicense == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione uma lincença para vincular ao ativo!',
        icon: 'warning',
      });
      return;
    }

    const data = { ativoId: assetId, licencaId: selectedLicense };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/licenses/linkActive`,
      withCredentials: true,
      data: data,
    };

    requestBackend(params)
      .then(() => {
        setFormContextData({ isEditing: false });

        Swal.fire({
          title: 'Sucesso!',
          text: 'Licença foi vinculada ao ativo!',
          icon: 'success',
        });

        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Falha!',
          text: `${error.response.data.message}`,
          icon: 'warning',
        });
      });
  };

  const handleCancel = () => {
    setFormContextData({ isEditing: false });
    closeModal();
  };

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Vincular licença">
          <Container>
            <Stack direction={'row'}>
              <SearchBar placeholder="Nome..." inputFilter={inputFilter} setInputFilter={setInputFilter} />
            </Stack>
            <DataTable
              columns={columns}
              data={licenses ? licenses : []}
              dense
              striped
              responsive
              fixedHeader
              sortIcon={<ExpandMoreIcon />}
              fixedHeaderScrollHeight={'62vh'}
              noDataComponent={<NoData />}
              pointerOnHover
              highlightOnHover
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
          </Container>
          <Box display={'flex'} justifyContent={'end'} marginTop={2}>
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
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

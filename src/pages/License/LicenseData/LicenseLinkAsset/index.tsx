import { BaseCard } from '../../../../style/GlobalStyles';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { requestBackend } from '../../../../http/requests';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import SearchBar from '../../../../components/SearchBar';
import Panel from '../../../../components/Panel';
import { Workstation } from 'types/Ativo/Workstation/Workstation';
import { FormContext } from '../../../../contexts/FormContext';
import CustomModal from '../../../../components/CustomModal';
import NoData from '../../../../components/NoData';
import { Container } from './style';

type LicenseLinkAssetProps = {
  licenseId?: string;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<Workstation>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true },
  { name: 'Nome', selector: (row) => row.nome, sortable: true },
  { name: 'Hostname', selector: (row) => row.nomeHost, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  { name: 'Valor aquisição', selector: (row) => row.vlrAquisicao, sortable: true },
];

export default function LicenseLinkAsset({ licenseId, openModal, closeModal }: LicenseLinkAssetProps) {
  const { setFormContextData } = useContext(FormContext);
  const [assets, setAssets] = useState<Workstation[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/workstation`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setAssets(response.data.content))
      .catch((error) => window.alert(error.response.data.message));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) setSelectedAsset(selectedRows.selectedRows[0].id);

    if (selectedRows.selectedCount == 0) setSelectedAsset('');
  };

  const handleConfirm = () => {
    if (selectedAsset == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione uma ativo para vincular a licença!',
        icon: 'warning',
      });
      return;
    }
    const data = {
      ativoId: selectedAsset,
      licencaId: licenseId,
    };
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
          text: 'Ativo foi vinculada a licença!',
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
    setFormContextData({
      isEditing: false,
      isAdding: false,
      isDuplicated: false,
    });
    closeModal();
  };

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Panel title="Vincular ativo">
          <Container>
            <Stack direction={'row'}>
              <SearchBar inputFilter={inputFilter} setInputFilter={setInputFilter} />
            </Stack>
            <DataTable
              columns={columns}
              data={assets ? assets : []}
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

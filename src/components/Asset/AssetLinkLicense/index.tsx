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
import SearchIcon from '@mui/icons-material/Search';
import CustomModal from '../../CustomModal';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable, { TableColumn } from 'react-data-table-component';
import NoData from '../../NoData';
import { Licenca } from '../../../types/Licenca/Licenca';
import Swal from 'sweetalert2';
import SerchBar from '../../../components/SearchBar';

type AssetLinkLicenseProps = {
  assetId?: string;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<Licenca>[] = [
  { name: 'Id', selector: (row) => row.id, sortable: true },
  { name: 'Software', selector: (row) => row.software, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  {
    name: 'Qtd. adquirida',
    selector: (row) => row.qtdAdquirida,
    sortable: true,
  },
  { name: 'Qtd. alocada', selector: (row) => row.qtdAlocada, sortable: true },
  {
    name: 'Valor aquisição',
    selector: (row) => row.vlrAquisicao,
    sortable: true,
  },
];

export default function AssetLinkLicense({
  assetId,
  openModal,
  closeModal,
}: AssetLinkLicenseProps) {
  const { setFormContextData } = useContext(FormContext);
  const [licenses, setLicenses] = useState<Licenca[]>();
  const [inputFilter, setInputFilter] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('');

  useEffect(() => {
    requestBackend({ url: `/licenses` })
      .then((response) => setLicenses(response.data.content))
      .catch((error) => window.alert(error.response.data.message));
  }, [inputFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0) {
      setSelectedLicense(selectedRows.selectedRows[0].id);
    }
  };

  function handleConfirm() {
    if (selectedLicense == '') {
      //fazer essa mensagem ter prioridade
      Swal.fire({
        title: 'Atenção!',
        text: 'Selecione uma lincença',
        icon: 'warning',
      });
      return;
    }
    const data = {
      ativoId: assetId,
      licencaId: selectedLicense,
    };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: `/licenses/linkActive`,
      data: data,
    };
    requestBackend(params)
      .then(() => {
        setFormContextData({ isEditing: false });
        Swal.fire('Sucesso!', 'Licença foi vinculada ao ativo!.', 'success');
        closeModal();
      })
      .catch((error) => {
        //verificar
        Swal.fire('Falha!', `${error.response.data.message}`, 'warning');
      });
  }

  function handleCancel() {
    setFormContextData({ isEditing: false });
    closeModal();
  }

  return (
    <CustomModal openModal={openModal}>
      <BaseCard>
        <Stack padding={2}>
          <Typography variant="h6"> Vincular Licença</Typography>
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

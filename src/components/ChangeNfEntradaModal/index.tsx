import { BaseCard } from '../../style/GlobalStyles';
import { SetStateAction, useContext, useEffect, useState } from 'react';
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
import SearchBar from '../../components/SearchBar';
import CircularLoading from '../Loaders/Progress';
import Panel from '../../components/Panel';
import Swal from 'sweetalert2';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search';
import NoData from '../../components/NoData';
import InputDatePeriod from '../../components/inputs/InputDatePeriod';
import { Container } from './style';
import { formatCurrency } from '../../utils/CurrencyConverter';

type ChangeNfEntradaModalProps = {
  assetId?: string;
  license: boolean;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<NotaFiscalEntrada>[] = [
  { name: 'Cod. Pessoa', selector: (row) => row.pessoa.id, width: '14%' },
  { name: 'Razão Social', selector: (row) => row.pessoa.razaoSocial, width: '30%' },
  { name: 'Numero da Nota', selector: (row) => row.nrNotaFiscal },
  { name: 'Data de Emissão', selector: (row) => dayjs(row.dtEmissao).format('DD/MM/YYYY') },
  { name: 'Data de Entrada', selector: (row) => dayjs(row.dtEntrada).format('DD/MM/YYYY') },
  { name: 'Valor da Nota', selector: (row) => formatCurrency(row.valorNotaFiscal) },
];

export default function ChangeNfEntradaModal({
  assetId,
  license,
  openModal: openForm,
  closeModal: closeForm,
}: ChangeNfEntradaModalProps) {
  const { setFormContextData } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<NotaFiscalEntrada[]>();
  const [selectedNfEntrada, setSelectedNfEntrada] = useState('');
  const [inputFilter, setInputFilter] = useState('');
  const [dtEmissaoInicioFilter, setDtEmissaoInicioFilter] = useState<Dayjs | null>(null);
  const [dtEmissaoFinalFilter, setDtEmissaoFinalFilter] = useState<Dayjs | null>(null);
  const [openCustomFilters, setOpenCustomFilters] = useState<null | HTMLElement>(null);
  const [statusFilterChecked, setStatusFilterchecked] = useState(false);
  const open = Boolean(openCustomFilters);

  useEffect(() => handleSearch(), []);

  const handleConfirm = () => {
    if (selectedNfEntrada == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione uma Nota Fiscal!',
        icon: 'warning',
      });
      return;
    }
    const data = { idNfEntrada: selectedNfEntrada };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: license ? `/licenses/${assetId}/nfEntrada/update` : `/asset/${assetId}/nfEntrada/update`,
      data,
      withCredentials: true,
    };
    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Nota Fiscal foi atribuida com sucesso!',
          icon: 'success',
        });

        setFormContextData({ isEditing: false });
        closeForm();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Falha',
          text: `${error.response.data.message}`,
          icon: 'success',
        });
      });
  };

  const handleSearch = () => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      url: `/nfEntrada?${inputFilter ? `&NrNotaFiscal=${inputFilter.trim()}` : ''}${
        dtEmissaoInicioFilter ? `&dtEmissaoInicio=${dayjs(dtEmissaoInicioFilter).format('DD/MM/YYYY')}` : ''
      }${dtEmissaoFinalFilter ? `&dtEmissaoFinal=${dayjs(dtEmissaoFinalFilter).format('DD/MM/YYYY')}` : ''}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setNotes(response.data.content))
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  };

  const handleClose = () => setOpenCustomFilters(null);

  const handleCancel = () => {
    setFormContextData({ isEditing: false });
    closeForm();
  };

  const handleSelectedRowsChange = (selectedRows: {
    selectedCount: number;
    selectedRows: { idNfEntrada: SetStateAction<string> }[];
  }) => {
    if (selectedRows.selectedCount != 0) setSelectedNfEntrada(selectedRows.selectedRows[0].idNfEntrada);
    if (selectedRows.selectedCount == 0) setSelectedNfEntrada('');
  };

  const handleClearFilters = () => {
    setStatusFilterchecked(false);
    setDtEmissaoFinalFilter(null);
    setDtEmissaoInicioFilter(null);
    setInputFilter('');
  };

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title="Atribuir nota fiscal">
          <Container>
            <Box display={'flex'} alignItems={'flex-start'} flexWrap={'wrap'}>
              <SearchBar
                placeholder="Número da NF..."
                type="number"
                inputFilter={inputFilter}
                setInputFilter={setInputFilter}
                onClearFilters={handleClearFilters}
                setOpenCustomFilters={setOpenCustomFilters}
              />
              <LoadingButton
                sx={{
                  bgcolor: 'primary',
                  height: 33,
                  marginTop: 0,
                  marginLeft: 0.5,
                  marginRight: 1,
                }}
                size="small"
                onClick={handleSearch}
                loading={isLoading}
                variant="contained"
              >
                <SearchIcon />
              </LoadingButton>
              {statusFilterChecked && (
                <InputDatePeriod
                  label="Dt.Emissão"
                  valueStart={dtEmissaoInicioFilter}
                  valueEnd={dtEmissaoFinalFilter}
                  onChangeStart={(date) => setDtEmissaoInicioFilter(date)}
                  onChangeEnd={(date) => setDtEmissaoFinalFilter(date)}
                />
              )}
            </Box>
            <DataTable
              columns={columns}
              data={notes ? notes : []}
              dense
              striped
              responsive
              fixedHeader
              sortIcon={<ExpandMoreIcon />}
              noDataComponent={<NoData />}
              fixedHeaderScrollHeight={'62vh'}
              pointerOnHover
              highlightOnHover
              selectableRows
              selectableRowsSingle
              onSelectedRowsChange={handleSelectedRowsChange}
              progressPending={isLoading}
              progressComponent={<CircularLoading />}
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
          <Box marginTop={6} display={'flex'} justifyContent={'end'}>
            <Button
              variant="contained"
              sx={{ height: 33 }}
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleCancel}
            >
              <Typography textTransform={'none'}>Cancelar</Typography>
            </Button>
            <LoadingButton
              color="success"
              sx={{ height: 33 }}
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
          <Menu sx={{ flexDirection: 'column' }} anchorEl={openCustomFilters} open={open} onClose={handleClose}>
            <MenuItem sx={{ marginRight: 2, padding: '0px 6px' }} onClick={handleClose}>
              <Checkbox
                size="small"
                checked={statusFilterChecked}
                onChange={(event) => setStatusFilterchecked(event.target.checked)}
              />
              <Typography fontSize={13} variant="subtitle2">
                Data de emissão
              </Typography>
            </MenuItem>
          </Menu>
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

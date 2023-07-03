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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toDate } from '../../utils/DateConverter';
import styled from 'styled-components';

type ChangeNfEntradaModalProps = {
  assetId?: string;
  license: boolean;
  openModal: boolean;
  closeModal: () => void;
};

const columns: TableColumn<NotaFiscalEntrada>[] = [
  {
    name: 'Cod. Pessoa',
    selector: (row) => row.pessoa.id,
    sortable: true,
    width: '14%',
  },
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
  {
    name: 'Data de Emissão',
    selector: (row) => toDate(row.dtEmissao),
    sortable: true,
  },
  {
    name: 'Data de Entrada',
    selector: (row) => toDate(row.dtEntrada),
    sortable: true,
  },
  {
    name: 'Valor da Nota',
    selector: (row) => row.valorNotaFiscal,
    sortable: true,
  },
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
  const [inputFilter, setInputFilter] = useState('');
  const [dtEmissaoInicioFilter, setDtEmissaoInicioFilter] = useState('');
  const [dtEmissaoFinalFilter, setDtEmissaoFinalFilter] = useState('');
  const [selectedNfEntrada, setSelectedNfEntrada] = useState('');

  const [dtEmissaoInicio, setDtEmissaoInicio] = useState('');
  const [dtEmissaoFinal, setDtEmissaoFinal] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const params: AxiosRequestConfig = {
      url: `/nfEntrada?NrNotaFiscal=${inputFilter}&dtEmissaoInicio=${dtEmissaoInicioFilter}&dtEmissaoFinal=${dtEmissaoFinalFilter}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setNotes(response.data.content);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [inputFilter, dtEmissaoInicioFilter, dtEmissaoFinalFilter]);

  const handleSelectedRowsChange = (selectedRows: any) => {
    if (selectedRows.selectedCount != 0)
      setSelectedNfEntrada(selectedRows.selectedRows[0].idNfEntrada);

    if (selectedRows.selectedCount == 0) setSelectedNfEntrada('');
  };

  function handleConfirm() {
    if (selectedNfEntrada == '') {
      Swal.fire({
        title: 'Atenção',
        text: 'Selecione uma Nota Fiscal!',
        icon: 'warning',
        confirmButtonColor: '#999999',
      });
      return;
    }
    const data = { idNfEntrada: selectedNfEntrada };
    const params: AxiosRequestConfig = {
      method: 'PUT',
      url: license
        ? `/licenses/${assetId}/nfEntrada/update`
        : `/active/${assetId}/nfEntrada/update`,
      data,
      withCredentials: true,
    };
    requestBackend(params)
      .then(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Nota Fiscal foi atribuida com sucesso!',
          icon: 'success',
          confirmButtonColor: '#999999',
        });

        setFormContextData({ isEditing: false });
        closeForm();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Falha',
          text: `${error.response.data.message}`,
          icon: 'success',
          confirmButtonColor: '#999999',
        });
      });
  }

  function handleCancel() {
    setFormContextData({ isEditing: false });
    closeForm();
  }

  return (
    <CustomModal openModal={openForm}>
      <BaseCard>
        <Panel title="Atribuir Nota Fiscal">
          <Container>
            <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
              <Stack direction={'row'}>
                <SerchBar
                  inputFilter={inputFilter}
                  setInputFilter={setInputFilter}
                  onClearFilters={() => {}}
                  setOpenCustomFilters={() => {}}
                />
              </Stack>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    value={dtEmissaoInicio}
                    onChange={(event) => {
                      setDtEmissaoInicioFilter(
                        dayjs(event).format('DD/MM/YYYY')
                      );
                    }}
                    slotProps={{
                      textField: {
                        margin: 'dense',
                        size: 'small',
                        variant: 'outlined',
                        InputLabelProps: {
                          style: {
                            fontSize: 14,
                          },
                        },
                        InputProps: {
                          style: {
                            fontSize: 13,
                            width: 150,
                            height: 33,
                          },
                        },
                      },
                    }}
                  />
                  <DatePicker
                    format="DD/MM/YYYY"
                    value={dtEmissaoFinal}
                    onChange={(event) => {
                      setDtEmissaoFinalFilter(
                        dayjs(event).format('DD/MM/YYYY')
                      );
                      console.log(
                        'data EMISSAO FINAL: ' +
                          dayjs(event).format('YYYY-MM-DD')
                      );
                    }}
                    slotProps={{
                      textField: {
                        margin: 'dense',
                        size: 'small',
                        variant: 'outlined',
                        InputLabelProps: {
                          style: {
                            fontSize: 14,
                          },
                        },
                        InputProps: {
                          style: {
                            fontSize: 13,
                            width: 150,
                            height: 33,
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
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
        </Panel>
      </BaseCard>
    </CustomModal>
  );
}

const Container = styled.div`
  @media (min-width: 400px) {
    width: 380px;
  }

  @media (min-width: 600px) {
    width: 500px;
  }

  @media (min-width: 720px) {
    width: 620px;
  }

  @media (min-width: 750px) {
    width: 700px;
  }

  @media (min-width: 900px) {
    width: 850px;
    height: 600px;
  }

  @media (min-width: 1100px) {
    width: 1000px;
    height: 600px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
    height: 600px;
  }

  @media (min-width: 1400px) {
    width: 1300px;
    height: 600px;
  }
`;

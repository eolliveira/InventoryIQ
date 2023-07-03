import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Licenca } from 'types/Licenca/Licenca';
import NoData from '../../../../components/NoData';
import { requestBackend } from '../../../../http/requests';
import AssetLinkLicense from '../../../../components/Asset/AssetLinkLicense';
import { FormContext } from '../../../../contexts/FormContext';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Swal from 'sweetalert2';
import { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Ativo } from '../../../../types/Ativo';

type LicenseAssetProps = {
  licenseId?: string;
};

export default function LicenseAsset({ licenseId }: LicenseAssetProps) {
  const columns: TableColumn<Ativo>[] = [
    {
      button: true,
      width: '70px',
      cell: (row) => (
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => onReleaseLicense(row.id)}
          aria-label="delete"
          size="small"
        >
          <IosShareIcon color="primary" fontSize="inherit" />
        </IconButton>
      ),
    },
    { name: 'Id', selector: (row) => row.id, sortable: true, width: '100px' },
    { name: 'Nome', selector: (row) => row.nome, sortable: true },
    { name: 'Hostname', selector: (row) => row.nomeHost, sortable: true },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Modelo',
      selector: (row) => row.modelo,
      sortable: true,
    },
  ];

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [assets, setAssets] = useState<Ativo[]>();
  const [openAssetLinkLicense, setAssetLinkLicense] = useState(false);
  const navigate = useNavigate();

  const getAssets = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/licenses/${licenseId}/assets`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => setAssets(response.data));
  }, [licenseId, formContextData]);

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  const onReleaseLicense = (assetId: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja desalocar a licença desse ativo? ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: 'secondary',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          ativoId: assetId,
          licencaId: licenseId,
        };

        const params: AxiosRequestConfig = {
          method: 'PUT',
          url: `/licenses/unlinkActive`,
          data,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire(
              'Sucesso!',
              'Licença foi desalocada do ativo!',
              'success'
            );
            setFormContextData({ isEditing: false });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Erro',
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonColor: '#999999',
            });
          });
      }
    });
  };

  const handleRowClicked = () => {};

  return (
    <Card
      sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }}
      variant="outlined"
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography
          margin={2}
          fontSize={16}
          fontWeight={'bold'}
          letterSpacing={1}
          color={'primary'}
          variant="h2"
        >
          Ativos vinculados
        </Typography>

        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 1 }}
          startIcon={<AddIcon />}
          onClick={() => setAssetLinkLicense(true)}
        >
          <Typography textTransform={'none'} fontSize={14}>
            Adicionar
          </Typography>
        </Button>
      </Box>
      <Divider color="gray" />
      <DataTable
        dense
        striped
        data={assets ? assets : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        selectableRows
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
        onRowClicked={handleRowClicked}
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
      {openAssetLinkLicense && (
        <AssetLinkLicense
          assetId={licenseId}
          openModal={openAssetLinkLicense}
          closeModal={() => setAssetLinkLicense(false)}
        />
      )}
    </Card>
  );
}

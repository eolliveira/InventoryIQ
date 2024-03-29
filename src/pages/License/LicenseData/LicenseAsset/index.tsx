import { AxiosRequestConfig } from 'axios';
import { Ativo } from '../../../../types/Ativo/Ativo';
import { requestBackend } from '../../../../http/requests';
import { FormContext } from '../../../../contexts/FormContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import NoData from '../../../../components/NoData';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Swal from 'sweetalert2';
import LicenseLinkAsset from '../LicenseLinkAsset';

type LicenseAssetProps = { licenseId?: string };

export default function LicenseAsset({ licenseId }: LicenseAssetProps) {
  const columns: TableColumn<Ativo>[] = [
    {
      button: true,
      width: '60px',
      cell: (row) => (
        <Tooltip title="Desalocar ativo">
          <IconButton sx={{ marginRight: 1 }} onClick={() => onReleaseLicense(row.id)} aria-label="delete" size="small">
            <IosShareIcon color="primary" fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ),
    },
    { name: 'Id', selector: (row) => row.id, width: '100px' },
    { name: 'Nome', selector: (row) => row.nome },
    { name: 'Hostname', selector: (row) => row.nomeHost },
    { name: 'Status', selector: (row) => row.status },
    { name: 'Modelo', selector: (row) => row.modelo },
  ];

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [assets, setAssets] = useState<Ativo[]>();
  const [openAssetLinkLicense, setAssetLinkLicense] = useState(false);

  const getAssets = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/licenses/${licenseId}/assets`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => setAssets(response.data));
  }, [licenseId, formContextData]);

  useEffect(() => getAssets(), [getAssets]);

  const onReleaseLicense = (assetId: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja desalocar a licença desse ativo? ',
      icon: 'question',
      showCancelButton: true,
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
            Swal.fire('Sucesso!', 'Licença foi desalocada do ativo!', 'success');
            setFormContextData({ isEditing: false });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Erro',
              text: `${error.response.data.message}`,
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2, backgroundColor: '#F8FAFC' }} variant="outlined">
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography margin={2} fontSize={16} fontWeight={'bold'} letterSpacing={1} color={'primary'} variant="h2">
          Ativos vinculados
        </Typography>
        <Button size="small" variant="outlined" sx={{ marginRight: 1 }} onClick={() => setAssetLinkLicense(true)}>
          <AddIcon />
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
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
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
        <LicenseLinkAsset
          licenseId={licenseId}
          openModal={openAssetLinkLicense}
          closeModal={() => setAssetLinkLicense(false)}
        />
      )}
    </Card>
  );
}

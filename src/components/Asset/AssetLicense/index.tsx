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
import NoData from '../../NoData';
import { requestBackend } from '../../../http/requests';
import { toDate } from '../../../utils/Date';
import AssetLinkLicense from '../AssetLinkLicense';
import { FormContext } from '../../../contexts/FormContext';
import IconButton from '@mui/material/IconButton';
import IosShareIcon from '@mui/icons-material/IosShare';
import Swal from 'sweetalert2';
import { AxiosRequestConfig } from 'axios';

type AssetLicenseProps = {
  assetId?: string;
};

export default function AssetLicense({ assetId }: AssetLicenseProps) {
  const columns: TableColumn<Licenca>[] = [
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
    { name: 'Software', selector: (row) => row.software, sortable: true },
    {
      name: 'Chave',
      selector: (row) => row.chave,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Tipo',
      selector: (row) => row.tpLicenca.nome,
      sortable: true,
    },
    {
      name: 'Data expiração',
      selector: (row) => toDate(row.dtExpiracao),
      sortable: true,
    },
    {
      name: 'Data aquisição',
      selector: (row) => toDate(row.dtAquisicao),
      sortable: true,
    },
  ];

  const { formContextData, setFormContextData } = useContext(FormContext);
  const [licenses, setLicenses] = useState<Licenca[]>();
  const [openAssetLinkLicense, setAssetLinkLicense] = useState(false);

  const getLicenses = useCallback(() => {
    requestBackend({ url: `/active/${assetId}/licenses` }).then((response) =>
      setLicenses(response.data)
    );
  }, [assetId, formContextData]);

  useEffect(() => {
    getLicenses();
  }, [getLicenses]);

  const onReleaseLicense = (licenseId: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja liberar a licença?',
      icon: 'warning',
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
        };

        requestBackend(params)
          .then(() => {
            Swal.fire('Sucesso!', 'Licença foi liberada!', 'success');
            setFormContextData({ isEditing: false });
          })
          .catch((error) => {
            Swal.fire('Erro!', `${error.response.data.message}`, 'error');
          });
      }
    });
  };

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
          Licenças vinculadas
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
        data={licenses ? licenses : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={<NoData />}
        responsive
        fixedHeader
        selectableRows
        pointerOnHover
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
        <AssetLinkLicense
          assetId={assetId}
          openModal={openAssetLinkLicense}
          closeModal={() => setAssetLinkLicense(false)}
        />
      )}
    </Card>
  );
}

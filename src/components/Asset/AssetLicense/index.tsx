import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DataTable, { TableColumn } from 'react-data-table-component';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useEffect, useState } from 'react';
import { Licenca } from 'types/Licenca/Licenca';
import NoData from '../../NoData';
import { requestBackend } from '../../../http/requests';

type AssetLicenseProps = {
  assetId?: string;
};

const columns: TableColumn<Licenca>[] = [
  {
    name: '#',
    selector: (row) => row.id,
    sortable: true,
    grow: 0.6,
  },
  { name: 'Software', selector: (row) => row.software, sortable: true },
  { name: 'Fabricante', selector: (row) => row.fabricante, sortable: true },
  {
    name: 'Chave',
    selector: (row) => row.chave,
    sortable: true,
    grow: 2,
  },
  {
    name: 'Tipo',
    selector: (row) => row.tpLicenca,
    sortable: true,
  },
  {
    name: 'Data expiração',
    selector: (row) => row.dtExpiracao,
    sortable: true,
  },
  {
    name: 'Data aquisição',
    selector: (row) => row.dtAquisicao,
    sortable: true,
  },
];

export default function AssetLicense({ assetId }: AssetLicenseProps) {
  const [licenses, setLicenses] = useState<Licenca[]>();

  const getLicenses = useCallback(() => {
    requestBackend({ url: `/active/${assetId}/licenses` }).then((response) =>
      setLicenses(response.data)
    );
  }, [assetId]);

  useEffect(() => {
    getLicenses();
  }, [getLicenses]);

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
          Licenças de software vinculadas ao ativo
        </Typography>

        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ marginRight: 1 }}
          startIcon={<AddIcon />}
          onClick={() => {}}
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
      />
    </Card>
  );
}

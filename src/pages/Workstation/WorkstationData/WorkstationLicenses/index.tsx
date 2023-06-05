import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DataTable from 'react-data-table-component';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type WorkstationLicensesProps = {
  teste: number;
};

export default function WorkstationLicenses({
  teste,
}: WorkstationLicensesProps) {
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
      {/* <DataTable
        dense
        data={services ? services : []}
        columns={columns}
        sortIcon={<ExpandMoreIcon />}
        noDataComponent={
          <NoData />
        }
        responsive
        fixedHeader
        selectableRows
        pointerOnHover
        highlightOnHover
        fixedHeaderScrollHeight={'82vh'}
      /> */}
    </Card>
  );
}

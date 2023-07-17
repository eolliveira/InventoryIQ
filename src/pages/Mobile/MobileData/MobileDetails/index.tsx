import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextInfo from '../../../../components/TextInfo';
import { formatCurrency } from '../../../../utils/CurrencyConverter';
import InterfaceList from '../../../../components/Asset/InterfaceList/InterfaceList';
import { Mobile } from '../../../../types/Ativo/Mobile';

type MobileDetailsProps = { data?: Mobile };

export default function MobileDetails({ data }: MobileDetailsProps) {
  return (
    <Box marginTop={2}>
      <div className="row">
        <div className="col-lg-6">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #e9e9e9',
              borderRadius: 2,
              padding: 1.5,
              marginBottom: 1,
              minHeight: 386,
            }}
          >
            <TextInfo label="Nome" text={data?.nome || '-'} />
            <TextInfo label="Fabricante" text={data?.fabricante || '-'} />
            <TextInfo label="Hostname" text={data?.nomeHost || '-'} />
            <TextInfo label="Gateway" text={data?.gateway || '-'} />
            <TextInfo label="IMEI" text={data?.imei || '-'} />
            <TextInfo label="Observação" text={data?.observacao || '-'} />
          </Card>
        </div>
        <div className="col-lg-6">
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #e9e9e9',
              borderRadius: 2,
              padding: 1.5,
              minHeight: 386,
            }}
          >
            <TextInfo label="Modelo" text={data?.modelo || '-'} />
            <TextInfo label="Numero de série" text={data?.numeroSerie || '-'} />
            <TextInfo
              label="Data aquisição"
              text={data?.dtAquisicao ? dayjs(data?.dtAquisicao).format('DD/MM/YYYY') : '-'}
            />
            <div className="row">
              <div className="col-lg-7">
                <TextInfo
                  label="Data venc. Garantia"
                  text={data?.dtVencimentoGarantia ? dayjs(data?.dtVencimentoGarantia).format('DD/MM/YYYY') : '-'}
                />
                <TextInfo
                  label="Valor compra"
                  text={data?.vlrAquisicao ? formatCurrency(String(data?.vlrAquisicao)) : '-'}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      {data && <InterfaceList assetId={data.id} />}
    </Box>
  );
}

import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextInfo from '../../../../components/TextInfo';
import { formatCurrency } from '../../../../utils/CurrencyConverter';
import { Licenca } from '../../../../types/Licenca/Licenca';

type LicenseDetailsProps = {
  data?: Licenca;
};

export default function LicenseDetails({ data }: LicenseDetailsProps) {
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

            <TextInfo label="Chave" text={data?.chave || '-'} />
            <TextInfo label="Numero de série" text={data?.numeroSerie || '-'} />
            <TextInfo
              label="Quantidade adquirida"
              text={String(data?.qtdAdquirida) || '-'}
            />
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
            <TextInfo label="Software" text={data?.software.nome || '-'} />
            <TextInfo
              label="Tipo de licença"
              text={data?.tpLicenca.nome || '-'}
            />
            <TextInfo
              label="Data aquisição"
              text={
                data?.dtAquisicao
                  ? dayjs(data?.dtAquisicao).format('DD/MM/YYYY')
                  : '-'
              }
            />
            <div className="row">
              <div className="col-lg-7">
                <TextInfo
                  label="Data venc. Garantia"
                  text={
                    data?.dtExpiracao
                      ? dayjs(data?.dtExpiracao).format('DD/MM/YYYY')
                      : '-'
                  }
                />
                <TextInfo
                  label="Valor compra"
                  text={
                    data?.vlrAquisicao
                      ? formatCurrency(String(data?.vlrAquisicao))
                      : '-'
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Box>
  );
}

import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextInfo from '../../../../components/TextInfo';
import { Interface } from '../../../../types/Interface';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../../../http/requests';
import { formatCurrency } from '../../../../utils/CurrencyConverter';
import { Licenca } from '../../../../types/Licenca/Licenca';

type LicenseDetailsProps = {
  data?: Licenca;
};

export default function LicenseDetails({ data }: LicenseDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [listInterfaces, setListInterfaces] = useState<Interface[]>();

  useEffect(() => {
    setIsLoading(true);
    requestBackend({ url: `/active/${data?.id}/interfaces` })
      .then((response) => {
        console.log('teste');
        setListInterfaces(response.data);
      })
      .catch((error) => console.log('Erro ao carregar as interfaces: ' + error))
      .finally(() => setIsLoading(false));
  }, [data]);

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
            <TextInfo label="Software" text={data?.software.nome || '-'} />
            <TextInfo
              label="Tipo de licença"
              text={data?.tpLicenca.nome || '-'}
            />
            <TextInfo label="Chave" text={data?.chave || '-'} />
            <TextInfo label="Numero de série" text={data?.numeroSerie || '-'} />
            <TextInfo
              label="Quantidade adquirida"
              text={String(data?.qtdAdquirida) || '-'}
            />
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
              <div className="col-lg-5">
                <h2 style={{ border: '1px solid silver' }}>anexo</h2>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Box>
  );
}

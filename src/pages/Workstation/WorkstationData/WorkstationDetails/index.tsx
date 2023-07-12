import { Workstation } from '../../../../types/Workstation/Workstation';

import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextInfo from '../../../../components/TextInfo';
import { formatCurrency } from '../../../../utils/CurrencyConverter';

import InterfaceList from '../../../../components/Asset/InterfaceList/InterfaceList';

type WorkstationDetailsProps = {
  data?: Workstation;
};

export default function WorkstationDetails({ data }: WorkstationDetailsProps) {
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
            <TextInfo
              label="Memória Virtual"
              text={data?.memoriaRam + ' GB' || '-'}
            />
            <TextInfo label="Dominio" text={data?.dominio || '-'} />
            <TextInfo label="Gateway" text={data?.gateway || '-'} />
            <TextInfo label="Dns" text={data?.dns || '-'} />
            <TextInfo
              label="Ultimo usuário logado"
              text={data?.ultimoUsuarioLogado || '-'}
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
            <TextInfo
              label="Sistema operacional"
              text={data?.sistemaOperacional || '-'}
            />
            <TextInfo label="Processador" text={data?.processador || '-'} />
            <TextInfo label="Arquitetura" text={data?.arquiteturaSo || '-'} />
            <TextInfo label="Numero de série" text={data?.numeroSerie || '-'} />
            <TextInfo label="Modelo" text={data?.modelo || '-'} />
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
                    data?.dtVencimentoGarantia
                      ? dayjs(data?.dtVencimentoGarantia).format('DD/MM/YYYY')
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
      {data && <InterfaceList assetId={data.id} />}
    </Box>
  );
}

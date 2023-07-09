import React, { useCallback, useContext, useEffect, useState } from 'react';

import TabContext from '@material-ui/lab/TabContext';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import AssetMovements from '../../../components/Asset/AssetMovements';
import AssetLicense from '../../../components/Asset/AssetLicense';
import AssetService from '../../../components/Asset/AssetService';
import StockButton from '../../../components/buttons/StockButton';
import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import TabPanel from '@material-ui/lab/TabPanel';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssetSidePanel from '../../../components/Asset/AssetSidePanel';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';
import { Nobreak } from 'types/Nobreak';
import { Coletor } from 'types/Coletor';
import CollectorForm from './CollectorForm';
import CollectorDetails from './CollectorDetails';

export default function CollectorData() {
  const [openCollectorForm, setOpenCollectorForm] = useState(false);

  type urlParams = {
    collectorId: string;
  };

  const { collectorId } = useParams<urlParams>();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [collector, setCollector] = useState<Coletor>();
  const [tabValue, setTabValue] = useState('1');
  const navigate = useNavigate();

  const getCollectorData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/collectors/${collectorId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setCollector(response.data))
      .catch((error) => console.log(error));
  }, [collectorId, formContextData]);

  useEffect(() => getCollectorData(), [getCollectorData]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) =>
    setTabValue(newValue);

  function handleAdd() {
    setFormContextData({ isAdding: true });
    setOpenCollectorForm(true);
  }

  function handleEdit() {
    setFormContextData({ isEditing: true });
    setOpenCollectorForm(true);
  }

  const handleDuplicate = () => {
    setFormContextData({ isAdding: true, isDuplicated: true });
    setOpenCollectorForm(true);
  };

  const handleRemove = () => {
    Swal.fire({
      icon: 'question',
      title: `Deseja remover o ativo?`,
      text: 'Todas as informações e histórico de movimentos serão perdidas! ',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: `#dc3545`,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#999999',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/active/${collector?.id}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido',
              text: 'ativo removido com sucesso!',
              icon: 'success',
              confirmButtonColor: '#999999',
            });

            navigate('/nobreak');
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'warning',
              confirmButtonColor: '#999999',
            });
          });
      }
    });
  };

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-3">
        <AssetSidePanel data={collector ?? ({} as Coletor)} />
      </ContainerSidePanel>
      <BaseCard className="col-lg-9">
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-between'}
          margin={'20px 0'}
        >
          <IconButton
            aria-label="back"
            size="medium"
            onClick={() => navigate('/collector')}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>

          <Typography
            fontSize={16}
            fontWeight={'bold'}
            letterSpacing={0.7}
            color={'primary'}
            marginLeft={2}
            flex={1}
          >
            {(collector ? collector?.id : '') +
              ' - ' +
              (collector ? collector?.nome : '')}
          </Typography>

          <StockButton
            fontSize={14}
            onClickAdd={handleAdd}
            onClickDuplicate={handleDuplicate}
            onClickEdit={handleEdit}
            onClickRemove={handleRemove}
            isDisabled={formContextData.isAdding || formContextData.isEditing}
          />
        </Box>
        <TabContext value={tabValue}>
          <AppBar
            position="static"
            style={{
              boxShadow: 'none',
              backgroundColor: `white`,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <CustomTab
                  value="1"
                  label="Detalhes"
                  iconPosition="start"
                  icon={<TextSnippetTwoToneIcon />}
                />

                <CustomTab
                  value="2"
                  label="Movimentos"
                  iconPosition="start"
                  icon={<ChangeCircleTwoToneIcon />}
                />
                <CustomTab
                  value="3"
                  label="Serviços"
                  iconPosition="start"
                  icon={<HandymanTwoToneIcon />}
                />
              </Tabs>
            </Box>
          </AppBar>
          <TabPanel style={{ padding: 0 }} value="1">
            <CollectorDetails data={collector} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="2">
            <AssetMovements assetId={collector?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="3">
            <AssetService assetId={collector?.id} />
          </TabPanel>
        </TabContext>
      </BaseCard>
      {openCollectorForm && (
        <CollectorForm
          data={collector}
          openForm={openCollectorForm}
          closeForm={() => setOpenCollectorForm(false)}
        />
      )}
    </Wapper>
  );
}

const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  height: calc(100vh - 110px);

  @media (min-width: 991px) {
    flex-direction: row-reverse;
  }
`;

const CustomTab = styled(Tab)`
  font-size: small !important;
  text-transform: none !important;
`;

const ContainerSidePanel = styled.div`
  padding: 0px;
  margin-bottom: 4px;

  @media (min-width: 1100px) {
    margin-bottom: 0px;
  }

  @media (min-width: 991px) {
    margin-bottom: 0px;
    padding: 0px 0px 0px 4px;
  }
`;

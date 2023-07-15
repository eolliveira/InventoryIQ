import React, { useCallback, useContext, useEffect, useState } from 'react';
import TabContext from '@material-ui/lab/TabContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import AssetMovements from '../../../components/Asset/AssetMovements';
import AssetService from '../../../components/Asset/AssetService';
import StockButton from '../../../components/buttons/StockButton';
import { useNavigate, useParams } from 'react-router-dom';
import { requestBackend } from '../../../http/requests';
import TabPanel from '@material-ui/lab/TabPanel';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import AssetSidePanel from '../../../components/Asset/AssetSidePanel';
import { FormContext } from '../../../contexts/FormContext';
import { BaseCard } from '../../../style/GlobalStyles';
import { AxiosRequestConfig } from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone';
import { Nobreak } from 'types/Nobreak';
import NobreakForm from './NobreakForm';
import NobreakDetails from './NobreakDetails';
import { ContainerSidePanel, CustomTab, Wapper } from './style';

type urlParams = { nobreakId: string };

export default function NobreakData() {
  const navigate = useNavigate();
  const { formContextData, setFormContextData } = useContext(FormContext);
  const [nobreak, setNobreak] = useState<Nobreak>();
  const { nobreakId } = useParams<urlParams>();

  const [tabValue, setTabValue] = useState('1');
  const [openNobreakForm, setOpenNobreakForm] = useState(false);

  const getNobreakData = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: `/nobreak/${nobreakId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => setNobreak(response.data))
      .catch((error) => console.log(error));
  }, [nobreakId, formContextData]);

  useEffect(() => getNobreakData(), [getNobreakData]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => setTabValue(newValue);

  const handleAdd = () => {
    setFormContextData({ isAdding: true });
    setOpenNobreakForm(true);
  };

  const handleEdit = () => {
    setFormContextData({ isEditing: true });
    setOpenNobreakForm(true);
  };

  const handleDuplicate = () => {
    setFormContextData({ isAdding: true, isDuplicated: true });
    setOpenNobreakForm(true);
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
      denyButtonColor: '#4d4d4d',
    }).then((result) => {
      if (result.isConfirmed) {
        const params: AxiosRequestConfig = {
          method: 'DELETE',
          url: `/asset/${nobreak?.id}`,
          withCredentials: true,
        };

        requestBackend(params)
          .then(() => {
            Swal.fire({
              title: 'Removido',
              text: 'ativo removido com sucesso!',
              icon: 'success',
            });

            navigate('/nobreak');
          })
          .catch((error) => {
            Swal.fire({
              title: 'Falha!',
              text: `${error.response.data.message}`,
              icon: 'warning',
            });
          });
      }
    });
  };

  return (
    <Wapper className="row">
      <ContainerSidePanel className="col-lg-3">
        <AssetSidePanel data={nobreak ?? ({} as Nobreak)} />
      </ContainerSidePanel>
      <BaseCard className="col-lg-9">
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-between'}
          margin={'20px 0'}
        >
          <IconButton aria-label="back" size="medium" onClick={() => navigate('/nobreak')}>
            <ArrowBackIcon color="primary" />
          </IconButton>

          <Typography fontSize={16} fontWeight={'bold'} letterSpacing={0.7} color={'primary'} marginLeft={2} flex={1}>
            {(nobreak ? nobreak?.id : '') + ' - ' + (nobreak ? nobreak?.nome : '')}
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
              <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                <CustomTab value="1" label="Detalhes" iconPosition="start" icon={<TextSnippetTwoToneIcon />} />
                <CustomTab value="2" label="Movimentos" iconPosition="start" icon={<ChangeCircleTwoToneIcon />} />
                <CustomTab value="3" label="Serviços" iconPosition="start" icon={<HandymanTwoToneIcon />} />
              </Tabs>
            </Box>
          </AppBar>
          <TabPanel style={{ padding: 0 }} value="1">
            <NobreakDetails data={nobreak} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="2">
            <AssetMovements assetId={nobreak?.id} />
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value="3">
            <AssetService assetId={nobreak?.id} />
          </TabPanel>
        </TabContext>
      </BaseCard>
      {openNobreakForm && (
        <NobreakForm data={nobreak} openForm={openNobreakForm} closeForm={() => setOpenNobreakForm(false)} />
      )}
    </Wapper>
  );
}

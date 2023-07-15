import styled from 'styled-components';
import Tab from '@mui/material/Tab';

export const Wapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  height: calc(100vh - 110px);

  @media (min-width: 991px) {
    flex-direction: row-reverse;
  }
`;

export const CustomTab = styled(Tab)`
  font-size: small !important;
  text-transform: none !important;
`;

export const ContainerSidePanel = styled.div`
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

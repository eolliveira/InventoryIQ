import styled from 'styled-components';
import { BaseCard } from '../../style/GlobalStyles';

export const Wapper = styled(BaseCard)`
  height: 100%;
  padding: 12px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

import { theme } from '../../style/Theme';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

export const TextButton = styled.p`
  font-size: ${theme.size.md};
  text-transform: none;
  margin: 0;
`;

import styled from 'styled-components';

export const ProgressBar = styled.div`
  width: 100%;
  height: 24px;
  padding: 0px;
  border: 1px solid #e2e2e2;
  background-color: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  text-align: center;
  background-color: ${({ percentage }) => (percentage < 90 ? '#2195f3ae' : '#e35d6ae1')};
  width: ${({ percentage }) => `${percentage}%`};
`;

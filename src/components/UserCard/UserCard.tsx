import { theme } from '../../style/Theme';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { toCamelCase } from '../../utils/Converter';

type UserCardProps = {
  nome?: string;
  email?: string;
};

export default function UserCard({ nome, email }: UserCardProps) {
  return (
    <>
      <Text>Usuário</Text>
      <Card>
        <AccountCircleIcon
          sx={{ marginRight: 1, color: `${theme.colors.secondary}` }}
          fontSize="large"
        />
        <Content>
          <Username>{toCamelCase(nome ? nome : '')}</Username>
          <Email>{email ? email : ''}</Email>
        </Content>
        <EditIcon
          sx={{ color: `${theme.colors.secondary}` }}
          fontSize="small"
        />
      </Card>
    </>
  );
}

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid ${theme.colors.primary};
  padding: 7px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

const Text = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 2px 0px;
`;

const Username = styled.h6`
  margin: 0;
  font-size: 13px;
  font-weight: bold;

  font-weight: normal;
  line-height: 16px;

  letter-spacing: 0.03em;
`;

const Email = styled.p`
  margin: 0;
  font-size: 13px;
`;






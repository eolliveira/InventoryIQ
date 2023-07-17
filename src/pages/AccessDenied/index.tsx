import { BackButton, Container, Message, Title } from './style';

export default function AccessDenied() {
  return (
    <Container>
      <Title>Acesso Negado</Title>
      <Message>Você não tem permissão para acessar esta página.</Message>
      <BackButton onClick={() => window.history.back()}>Voltar</BackButton>
    </Container>
  );
}

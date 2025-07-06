import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({ hasError, quantidadeContacts, quantidadeFilteredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : (
      quantidadeContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container justifyContent={alignment}>
      {(!hasError && quantidadeContacts > 0) && ( // Um bloco é de condições, o outro é de renderização
        <strong>
          {quantidadeFilteredContacts}
          {quantidadeFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
      <Link to="/categories">Categorias</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  quantidadeContacts: PropTypes.number.isRequired,
  quantidadeFilteredContacts: PropTypes.number.isRequired,
};

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InputSearch({ value, onChange } ) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquisar contato"
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

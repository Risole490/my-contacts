import lupa from '../../../../assets/images/magnifier-question.svg';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={lupa} alt="Lupa" />

      <span>
        Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

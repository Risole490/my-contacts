import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />

      <div className="details">
        <strong>Desculpe, ocorreu um erro ao carregar os contatos</strong>

        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};

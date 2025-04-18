import { Link } from 'react-router-dom';

import { Container, InputSearchContainer, Header, ListContainer, Card } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
 return (
  <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nome do contato</strong>
              <small>Instagram</small>
            </div>

            <span>leozera@yan.com.br</span>
            <span>(11) 91234-5678</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
 );
}

// Só para teste
fetch('http://localhost:3001/categories')
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

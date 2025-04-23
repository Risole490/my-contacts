import { Link } from 'react-router-dom';

import { useEffect, useState , useMemo} from 'react';
import { Container, InputSearchContainer, Header, ListHeader, Card } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import Loader from '../../components/Loader';

import delay from '../../utils/delay'; // Importa a função de atraso

export default function Home() {
  const [contacts, setContacts] = useState([]); // Estado para armazenar os contatos
  const [orderBy, setOrderBy] = useState('asc'); // Estado para armazenar a ordem de exibição
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) // Aqui dentro do useMemo, o valor fica memorizado
  )), [contacts, searchTerm]); // O useMemo só vai ser chamado quando o contacts ou searchTerm mudar
  // O useMemo é usado para otimizar o desempenho, evitando cálculos desnecessários

  // useEffect para buscar os contatos do servidor
  useEffect(() => {
    setIsLoading(true); // Define o estado de carregamento como verdadeiro

    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async(response) => {
        await delay(2000); // Adiciona um atraso de 2 segundos

        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false); // Define o estado de carregamento como falso
      });
  }, [orderBy]);

  // Primeira forma de fazer a ordenação
  // function handleToggleOrderBy() {
  //   const newOrder = orderBy === 'asc' ? 'desc' : 'asc';
  //   setOrderBy(
  //     newOrder
  //   );

  //   fetch(`http://localhost:3001/contacts?orderBy=${newOrder}`)
  //     .then(async(response) => {
  //       const json = await response.json();
  //       setContacts(json);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }

  // Segunda forma de fazer a ordenação
  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc')
    );
  }

  // Função para lidar com a mudança no campo de pesquisa
  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          type="text"
          placeholder="Pesquisar contato"
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {/* Se a lista de contatos filtrados não estiver vazia, exibe o cabeçalho */}
      {filteredContacts.length > 0 && (
        <ListHeader orderby={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
        <div className="info">
          <div className="contact-name">
            <strong>{contact.name}</strong>
            {contact.category_name &&
              <small>{contact.category_name}</small>
            }
          </div>

          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
 );
}

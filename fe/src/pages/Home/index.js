import { Link } from 'react-router-dom';

import { useEffect, useState , useMemo, useCallback } from 'react';
import { Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer, EmptyListContainer, SearchNotFoundContainer } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import lupa from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]); // Estado para armazenar os contatos
  const [orderBy, setOrderBy] = useState('asc'); // Estado para armazenar a ordem de exibição
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento. Começa como true para evitar uma quarta renderização desnecessária
  const [hasError, setHasError] = useState(false); // Estado para controlar se houve erro na requisição

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) // Aqui dentro do useMemo, o valor fica memorizado
  )), [contacts, searchTerm]); // O useMemo só vai ser chamado quando o contacts ou searchTerm mudar
  // O useMemo é usado para otimizar o desempenho, evitando cálculos desnecessários


  const loadContacts = useCallback(async () => {
    // Função assíncrona para carregar os contatos
    try {
      setIsLoading(true); // Define o estado de carregamento como verdadeiro

      const contactsList = await ContactsService.listContacts(orderBy); // Chama o serviço para listar os contatos
      // const contactsList = [];

      setHasError(false); // Se a requisição for bem-sucedida, define o estado de erro como falso
      setContacts(contactsList); // Atualiza o estado com a lista de contatos
    } catch {
      setHasError(true); // Se ocorrer um erro, atualiza o estado de erro
    } finally {
      setIsLoading(false); // Define o estado de carregamento como falso após a conclusão da busca
    }
  }, [orderBy]); // O useCallback só vai ser chamado quando o orderBy mudar
  // O useCallback é usado para memorizar a função loadContacts em um endereço de memória 'x' , evitando que ela seja recriada em cada renderização e mudando seu endereço de memória.
  // Isso é útil para otimizar o desempenho, especialmente quando a função é passada como dependência para outros hooks ou componentes.

  useEffect(() => {
    loadContacts(); // Chama a função para carregar os contatos
  }, [loadContacts]); // O useEffect só vai ser chamado quando o loadContacts mudar

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

  function handleTryAgain() {
    loadContacts(); // Chama a função para tentar carregar os contatos novamente
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        title="Tem certeza que deseja remover contato?"
        confirmLabel="Remover"
        onCancel={() => alert('Cancelou')}
        onConfirm={() => alert('Confirmou')}
      >
        <p>Corpo do modal</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            type="text"
            placeholder="Pesquisar contato"
          />
        </InputSearchContainer>
      )}

      <Header justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
              ? 'space-between'
              : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && ( // Um bloco é de condições, o outro é de renderização
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Desculpe, ocorreu um erro ao carregar os contatos</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {/* Se a lista de contatos filtrados estiver vazia e a lista de contatos não estiver vazia, exibe a mensagem de "nenhum resultado encontrado" */}
          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={lupa} alt="Lupa" />

              <span>
                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {/* Se a lista de contatos filtrados não estiver vazia, exibe o
          cabeçalho */}
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
        </>
      )}
    </Container>
 );
}

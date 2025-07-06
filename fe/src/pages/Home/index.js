import { Link } from 'react-router-dom';

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

import useHome from './useHome'; // Importa o hook personalizado para a página inicial

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        isLoading={isLoadingDelete} // Indica se a exclusão está em processo de carregamento
        visible={isDeleteModalVisible} // A visibilidade do modal de exclusão é controlada por este estado
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}" ?`} // Exibe o nome do contato que está sendo excluído
        confirmLabel="Remover"
        onCancel={handleCloseDeleteModal} // Função chamada ao cancelar a exclusão
        onConfirm={handleConfirmDeleteContact} // Função chamada ao confirmar a exclusão
      >
        <p>Esta ação não poderá ser desfeita!</p>
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
        <Link to="/categories">Categorias</Link>
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
                {contact.category.name &&
                  <small>{contact.category.name}</small>
                }
              </div>

              <span>{contact.email}</span>
              <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  // onClick={handleDeleteContact(contact)} // Causa uma re-renderização imediata do componente, o que não é o ideal.
                  onClick={() => handleDeleteContact(contact)} // Passa a função de exclusão com o contato como argumento
                >
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

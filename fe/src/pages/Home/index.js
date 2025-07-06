import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal'; // Importa o componente Modal

import useHome from './useHome'; // Importa o hook personalizado para a página inicial

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';

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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        quantidadeContacts={contacts.length}
        quantidadeFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}


      {hasContacts && (
        <>
          {/* Se a lista de contatos filtrados não estiver vazia, exibe o
          cabeçalho */}
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

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

        </>
      )}
    </Container>
 );
}

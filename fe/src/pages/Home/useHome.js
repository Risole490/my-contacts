import { useEffect, useState , useMemo, useCallback } from 'react';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]); // Estado para armazenar os contatos
  const [orderBy, setOrderBy] = useState('asc'); // Estado para armazenar a ordem de exibição
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento. Começa como true para evitar uma quarta renderização desnecessária
  const [hasError, setHasError] = useState(false); // Estado para controlar se houve erro na requisição
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Estado para controlar a visibilidade do modal de exclusão
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null); // Estado para armazenar o contato que está sendo excluído
  const [isLoadingDelete, setIsLoadingDelete] = useState(false); // Estado para controlar o carregamento da exclusão do contato

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

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact); // Define o contato que está sendo excluído
    setIsDeleteModalVisible(true); // Define o estado do modal de exclusão como visível
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false); // Define o estado do modal de exclusão como invisível
    setContactBeingDeleted(null); // Limpa o contato que estava sendo excluído
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true); // Define o estado de carregamento da exclusão como verdadeiro

      await ContactsService.deleteContact(contactBeingDeleted.id); // Chama o serviço para excluir o contato

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id
      )); // Atualiza o estado de contatos, removendo o contato excluído

      handleCloseDeleteModal(); // Fecha o modal de exclusão

      toast({
        type: 'success',
        text: 'Contato removido com sucesso!'
      });
    } catch{
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover o contato!'
      });
    } finally {
      setIsLoadingDelete(false); // Define o estado de carregamento da exclusão como falso
    }
  }

  return {
    contacts,
    orderBy,
    searchTerm,
    isLoading,
    hasError,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    filteredContacts,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact
  };

}

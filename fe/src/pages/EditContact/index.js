import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";
import useIsMounted from "../../hooks/useIsMounted";

export default function EditContact() {
  // const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState(''); // Estado para armazenar o nome do contato

  const contactFormRef = useRef(null); // Referência para o formulário de contato

  const { id } = useParams(); // Obtém o ID do contato a ser editado a partir dos parâmetros da URL
  const history = useHistory(); // Hook para acessar o histórico de navegação
  const isMounted = useIsMounted(); // Hook para verificar se o componente está montado

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
        );

        if (isMounted()) {
          contactFormRef.current.setFieldsValue(contact); // Preenche o formulário com os dados do contato
          setIsLoading(false); // Define o estado de carregamento como falso
          setContactName(contact.name); // Atualiza o nome do contato no estado
        }
      } catch (error) {
        console.log(error); // Registra o erro no console

        if (isMounted()) {
          history.push('/'); // Redireciona para a página inicial se o contato não for encontrado
          toast({
            type: 'danger', // Tipo do toast
            text: 'Contato não encontrado.', // Texto do toast
          });
        }
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact); // O id do contato é passado como argumento para atualizar o contato existente. Mas também poderia ser informado no próprio objeto `contact`.
      setContactName(contactData.name); // Atualiza o nome do contato no estado

      toast({
        type: 'success', // Tipo do toast
        text: 'Contato editad com sucesso!', // Texto do toast
        duration: 4000, // Duração do toast em milissegundos
      });
    } catch {
      toast({
        type: 'danger', // Tipo do toast
        text: 'Erro ao editar o contato.', // Texto do toast
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`} // Exibe o nome do contato no título da página
      />

      <ContactForm
        // key={contact.id} // Garante que o formulário seja atualizado quando o contato mudar. Impede que a re-renderização do componente cause problemas com o estado interno. Ao invés de re-renderizar o componente inteiro, o React atualiza apenas os campos que mudaram.
        ref={contactFormRef} // Referência para o formulário de contato, permitindo que o componente pai acesse métodos e propriedades do componente filho.
        buttonLabel='Salvar'
        onSubmit={handleSubmit}
        // contact={contact}
      />
    </>
  );
}

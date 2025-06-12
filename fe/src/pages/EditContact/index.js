import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function EditContact() {
  // const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState(''); // Estado para armazenar o nome do contato

  const contactFormRef = useRef(null); // Referência para o formulário de contato

  const { id } = useParams(); // Obtém o ID do contato a ser editado a partir dos parâmetros da URL
  const history = useHistory(); // Hook para acessar o histórico de navegação

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
        );

        contactFormRef.current.setFieldsValue(contact); // Atualiza os campos do formulário com os dados do contato.
        setIsLoading(false);
        setContactName(contact.name); // Armazena o nome do contato no estado
      } catch {
        history.push('/'); // Redireciona para a página inicial se ocorrer um erro
        toast({
          type: 'danger',
          text: 'Contato não encontrado.',
        });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

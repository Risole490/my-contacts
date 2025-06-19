import { useRef } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function NewContact() {
  const contactFormRef = useRef(null); // Referência para o formulário de contato

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields(); // Reseta os campos do formulário após o cadastro

      toast({
        type: 'success', // Tipo do toast
        text: 'Contato cadastrado com sucesso!', // Texto do toast
        duration: 4000, // Duração do toast em milissegundos
      });
    } catch {
      toast({
        type: 'danger', // Tipo do toast
        text: 'Erro ao cadastrar o contato.', // Texto do toast
      });
    }
  }

  return (
    <>
      <PageHeader
        title='Novo Contato'
      />

      <ContactForm
        ref={contactFormRef} // Passa a referência do formulário de contato
        buttonLabel='Cadastrar'
        onSubmit={handleSubmit} // Função de callback para o submit
      />
    </>
  );
}

import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

import { useRef } from "react";

export default function NewContact() {
  const contactFormRef = useRef(null); // Referência para o formulário de contato

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

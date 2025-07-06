import { useRef } from 'react';

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useNewContact() {
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

  return {
    contactFormRef, // Retorna a referência do formulário de contato
    handleSubmit, // Retorna a função de callback para o submit
  };
}

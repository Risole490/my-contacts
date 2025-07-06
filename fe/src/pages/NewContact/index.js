import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

import useNewContact from "./useNewContact";

export default function NewContact() {
  const {
    contactFormRef, // Referência para o formulário de contato
    handleSubmit, // Função de callback para o submit
  } = useNewContact(); // Importa o hook personalizado para lógica de novo contato

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

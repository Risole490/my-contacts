import PropTypes from "prop-types";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";

export default function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit,
}) {
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
        onSubmit={onSubmit}
        // contact={contact}
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};

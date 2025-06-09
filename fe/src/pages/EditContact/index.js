import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(
          id,
        );

        console.log('Contato carregado:', contactData);
        setIsLoading(false);
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

  function handleSubmit() {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title='Editar Contato'
      />

      <ContactForm
        buttonLabel='Salvar'
        onSubmit={handleSubmit}
      />
    </>
  );
}

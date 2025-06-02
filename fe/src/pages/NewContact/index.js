import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const response = await ContactsService.createContact(contact);

      console.log(response);
    } catch {
      // alert('Erro ao cadastrar o contato.');
      const event = new CustomEvent('addtoast', { // Evento personalizado para adicionar um toast
        detail: { // Detalhes do evento (opcional)
          type: 'danger', // Tipo do toast
          text: 'Erro ao cadastrar o contato.', // Texto do toast
        },
      });

      document.dispatchEvent(event); // Dispara o evento personalizado
    }
  }

  return (
    <>
      <PageHeader
        title='Novo Contato'
      />

      <ContactForm
        buttonLabel='Cadastrar'
        onSubmit={handleSubmit} // Função de callback para o submit
      />
    </>
  );
}

import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);

      toast({
        type: 'success', // Tipo do toast
        text: 'Contato cadastrado com sucesso!', // Texto do toast
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
        buttonLabel='Cadastrar'
        onSubmit={handleSubmit} // Função de callback para o submit
      />
    </>
  );
}

/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import { useState, useEffect , forwardRef, useImperativeHandle } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({ // Permite que o componente pai acesse métodos e propriedades do componente filho
    setFieldsValue: (contact) => { // Método que permite que o componente pai defina os valores dos campos do formulário
      setName(contact.name ?? ''); // O operador de coalescência nula (??) garante que, se o valor for null ou undefined, o campo será definido como uma string vazia.
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category_id ?? '');
    },
  }), []); // O array vazio garante que o useImperativeHandle seja chamado apenas uma vez, quando o componente for montado.

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {} finally { // Nenhum tratamento de erro, pois o usuário não precisa saber se falhou ou não
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleNameChange (e) {
    setName(e.target.value);

    if(!e.target.value) {
      setError({
        field: 'name',
        message: 'Campo obrigatório'
      });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange (e) {
    setEmail(e.target.value);

    if(e.target.value && !isEmailValid(e.target.value)) {
      setError({
        field: 'email',
        message: 'E-mail inválido'
      });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange (e) {
    setPhone(formatPhone(e.target.value));
  }


  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });
    // .finally(() => { // Chama a função onSubmit passada como prop e como ela é assíncrona, usamos finally para garantir que o estado de submitting seja atualizado assim que a função terminar, seja com sucesso ou erro.
      setIsSubmitting(false);

    // Se tivesse outro código aqui embaixo que não depende do onSubmit, o ideal seria usar o finally ao invés do await. Pois assim, o código não ficaria esperando a função onSubmit terminar para continuar executando.
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder='Nome*'
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type='email'
          error={getErrorMessageByFieldName('email')}
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder='Telefone'
          value={phone}
          onChange={handlePhoneChange}
          maxLength='15'
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value=''>Sem categoria</option>

          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type='submit'
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

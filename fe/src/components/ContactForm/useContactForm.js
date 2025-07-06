import { useState, useEffect , useImperativeHandle } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit , ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
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
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => { // Método que permite que o componente pai redefina os campos do formulário
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
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
  }, [setCategories, setIsLoadingCategories]);

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

  return {
    categories,
    isLoadingCategories,
    isSubmitting,
    isFormValid,
    name,
    email,
    phone,
    categoryId,
    setCategoryId,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    getErrorMessageByFieldName
  };
}

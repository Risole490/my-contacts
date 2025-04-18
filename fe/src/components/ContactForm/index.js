import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

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


  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      name,
      email,
      phone,
      category,
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder='Nome*'
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type='email'
          error={getErrorMessageByFieldName('email')}
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder='Telefone'
          value={phone}
          onChange={handlePhoneChange}
          maxLength='15'
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Categoria</option>
          <option value='instagram'>Instagram</option>
          <option value='discord'>Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type='submit' disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

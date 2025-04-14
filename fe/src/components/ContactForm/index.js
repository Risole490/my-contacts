import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../../utils/isEmailValid';

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
  const [errors, setErrors] = useState([]);

  function handleNameChange (e) {
    setName(e.target.value);

    if(!e.target.value) {
      setErrors((prevErrors) => [
        ...prevErrors,
        {field: 'name', message: 'Nome é obrigatório'}
      ]);
    } else {
      setErrors((prevErrors) => prevErrors.filter(
        (error) => error.field !== 'name', // remove o erro se o campo for preenchido
      ));
    }
  }

  function handleEmailChange (e) {
    setEmail(e.target.value);

    if(e.target.value && !isEmailValid(e.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');
      if(errorAlreadyExists) {
        return;
      }

      setErrors((prevErrors) => [
        ...prevErrors,
        {field: 'email', message: 'E-mail inválido'}
      ]);
    } else {
      setErrors((prevErrors) => prevErrors.filter(
        (error) => error.field !== 'email', // remove o erro se o campo for preenchido
      ));
    }
  }

  console.log(errors);

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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          placeholder='Nome'
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder='Telefone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <Button type='submit'>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

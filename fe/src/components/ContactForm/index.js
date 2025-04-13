import PropTypes from 'prop-types';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { useState } from 'react';


export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

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
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

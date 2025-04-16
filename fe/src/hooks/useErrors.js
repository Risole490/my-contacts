import { useState } from 'react';

export default function useErrors() { // cria um hook personalizado para gerenciar os erros
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) { // a função setError recebe um objeto com o campo e a mensagem
    const errorAlreadyExists = errors.find((error) => error.field === field);
      if(errorAlreadyExists) {
        return;
      }

    setErrors((prevErrors) => [ // a função setError recebe um objeto com o campo e a mensagem
      ...prevErrors,
      {field, message}
    ]);
  }

  function removeError(field) { // a função removeError recebe o campo que queremos remover
    setErrors((prevErrors) => prevErrors.filter(
      (error) => error.field !== field,
    ));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message; // retorna a mensagem de erro se existir. O optional chaining evita erro caso não exista
  }

  return { setError, removeError, getErrorMessageByFieldName, errors }; // retorna as funções e o estado
}

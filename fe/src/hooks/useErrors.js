import { useState, useCallback } from 'react';

export default function useErrors() { // cria um hook personalizado para gerenciar os erros
  const [errors, setErrors] = useState([]);

  /* function setError({ field, message }) { // a função setError recebe um objeto com o campo e a mensagem
    const errorAlreadyExists = errors.find((error) => error.field === field);
      if(errorAlreadyExists) {
        return;
      }

    setErrors((prevErrors) => [ // a função setError recebe um objeto com o campo e a mensagem
      ...prevErrors,
      {field, message}
    ]);
  }
  */

  // Memoriza a função setError
  const setError = useCallback(({ field, message }) => {
    // A função de atualização de estado (prevErrors) não precisa estar nas dependências do useCallback
    // porque o React garante que ela será sempre a mais recente.
    setErrors((prevErrors) => {
      const errorAlreadyExists = prevErrors.find((error) => error.field === field);
      if (errorAlreadyExists) {
        return prevErrors; // Retorna o array inalterado se o erro já existe
      }
      return [...prevErrors, { field, message }];
    });
  }, []); // Array de dependências vazio, pois não depende de nenhuma variável externa que possa mudar

  /*  function removeError(field) { // a função removeError recebe o campo que queremos remover
    setErrors((prevErrors) => prevErrors.filter(
      (error) => error.field !== field,
    ));
  }
  */

  // Memoriza a função removeError
  const removeError = useCallback((field) => {
    setErrors((prevErrors) => prevErrors.filter(
      (error) => error.field !== field,
    ));
  }, []); // Array de dependências vazio

  /*  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message; // retorna a mensagem de erro se existir. O optional chaining evita erro caso não exista
  }
  */

  // Memoriza a função getErrorMessageByFieldName
  // Esta função depende do 'errors' state, então 'errors' precisa ser uma dependência.
  const getErrorMessageByFieldName = useCallback((fieldName) => {
    return errors.find((error) => error.field === fieldName)?.message;
  }, [errors]); // Esta função depende do estado 'errors'

  return { setError, removeError, getErrorMessageByFieldName, errors }; // retorna as funções e o estado
}

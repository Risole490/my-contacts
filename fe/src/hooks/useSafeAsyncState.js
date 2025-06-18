import { useState, useRef, useEffect, useCallback } from 'react';

// Custom hook para gerenciar estado de forma segura em operações assíncronas
// Esse hook é útil para evitar problemas de atualização de estado em componentes desmontados durante operações assíncronas, como chamadas de API.
// Ele encapsula o estado e a função de atualização, permitindo que o componente use o estado de forma segura.
export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState); // Inicializa o estado com o valor inicial fornecido

  const isMounted = useRef(false); // Referência para verificar se o componente está montado

  useEffect(() => {
    isMounted.current = true; // Define como verdadeiro quando o componente é montado

    return () => {
      isMounted.current = false; // Define como falso quando o componente é desmontado
    };
  }, []); // O array vazio garante que o efeito seja executado apenas uma vez, quando o componente é montado

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted.current) { // Verifica se o componente ainda está montado
      setState(data); // Atualiza o estado apenas se o componente estiver montado
    }
  }, []);

  return [state, setSafeAsyncState]; // Retorna o estado atual e a função para atualizá-lo
}

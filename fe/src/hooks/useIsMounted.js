import { useEffect, useRef, useCallback } from "react";

export default function useIsMounted() {
  const isMounted = useRef(false); // Referência para verificar se o componente está montado

    useEffect(() => {
      isMounted.current = true; // Define como verdadeiro quando o componente é montado

      return () => {
        isMounted.current = false; // Define como falso quando o componente é desmontado
      };
    }, []); // O array vazio garante que o efeito seja executado apenas uma vez, quando o componente é montado

    const getIsMounted = useCallback(() => {
      return isMounted.current; // Retorna o valor atual da referência
    }, []); // O array vazio garante que a função não seja recriada em cada renderização

  return getIsMounted; // Retorna a referência que indica se o componente está montado
}

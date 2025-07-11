import { useState, useEffect, useRef } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible); // Usamos useState para controlar se o elemento deve ser renderizado ou não.

  const animatedElementRef = useRef(null); // Usamos useRef para referenciar o elemento que será animado.

  useEffect(() => {
    // Quando a visibilidade do elemento mudar, atualiza o estado shouldRender
    if(visible){
      setShouldRender(true);
    }

    function handleAnimationEnd() { // Quando a animação de saída terminar, se o elemento não estiver visível, não renderiza mais o elemento.
      if(!visible) {
        setShouldRender(false);
      }
    }

    const elementRef = animatedElementRef.current; // Pega a referência do elemento animado.
    if(!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd); // Adiciona um listener para o evento de fim da animação
    }

    return () => {
      if(elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd); // Remove o listener quando o componente for desmontado ou a visibilidade mudar
      }
    };
  }, [visible]);

  return { shouldRender, animatedElementRef }; // Retorna o estado de renderização e a referência do elemento animado.
}

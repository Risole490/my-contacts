import { useState, useCallback, useRef, createRef, useEffect } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map()); // Armazena referências para os elementos animados
  const animationEndListeners = useRef(new Map()); // Armazena os listeners de animação para cada item

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId); // Obtém o listener de animação para o item atual
    removeListener(); // Remove o listener de animação do elemento

    animationEndListeners.current.delete(itemId); // Remove o item do mapa de listeners
    animatedRefs.current.delete(itemId); // Remove a referência do item atual

    setItems((prevState) => prevState.filter(
      (item) => item.id !== itemId, // Remove a mensagem com o ID correspondente
    ));
    setPendingRemovalItemsIds((prevState) => prevState.filter(
      (id) => itemId !== id, // Remove o ID da lista de IDs pendentes de remoção
    ));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);// Obtém a referência animada para o item atual
      const animatedElement = animatedRef?.current; // Obtém o elemento DOM da referência animada
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if(animatedElement && !alreadyHasListener ) { // Verifica se a referência existe e se já não tem um listener
        const onAnimationEnd = () => handleAnimationEnd(itemId); // Chama a função de animação quando a animação termina
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd); // Remove o listener de animação
        };

        // Adiciona o listener de animação ao elemento
        animatedElement.addEventListener('animationend', onAnimationEnd);
        // Adiciona o listener de animação apenas se ainda não existir
        animationEndListeners.current.set(itemId, removeListener);
      }
    });

    // A função de cleanup executa tanto no unmount do componente quanto quando a lista de IDs pendentes de remoção muda. Por isso transformei ela em um useEffect
    // Isso garante que os listeners de animação sejam removidos corretamente quando o componente é desmontado ou quando a lista de IDs pendentes de remoção muda
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener()); // Remove todos os listeners de animação pendentes
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]); // Adiciona o ID da mensagem à lista de IDs pendentes de remoção
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId); // Obtém a referência animada para o item atual

      if(!animatedRef) {
        animatedRef = createRef(); // Cria uma nova referência se não existir. O uso do createRef ao invés de useRef permite que cada item tenha sua própria referência única
        animatedRefs.current.set(itemId, animatedRef); // Armazena a referência no objeto
      }

      return animatedRef; // Retorna a referência animada para o item atual
  }, []);

  // Função para renderizar a lista de itens
  // O renderItem é uma função que recebe um item e retorna o JSX correspondente
  // Isso permite que você customize a renderização de cada item da lista
  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id); // Verifica se o item está na lista de remoção pendente
      const animatedRef = getAnimatedRef(item.id); // Obtém a referência animada para o item atual



      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}

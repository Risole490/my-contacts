import { useState, useCallback, useRef, createRef, useEffect } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map()); // Armazena referências para os elementos animados

  const animationEndListeners = useRef(new Map()); // Armazena os listeners de animação para cada item

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter(
      (item) => item.id !== id, // Remove a mensagem com o ID correspondente
    ));
    setPendingRemovalItemsIds((prevState) => prevState.filter(
      (itemId) => itemId !== id, // Remove o ID da lista de IDs pendentes de remoção
    ));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);// Obtém a referência animada para o item atual
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if(animatedRef?.current && !alreadyHasListener ) { // Verifica se a referência existe e se já não tem um listener
        // Adiciona o listener de animação apenas se ainda não existir
        animationEndListeners.current.set(itemId, true); // Marca que já tem um listener para este item

        animatedRef.current.addEventListener('animationend', () => {
          handleAnimationEnd(itemId); // Chama a função de animação quando a animação termina
        });
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

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

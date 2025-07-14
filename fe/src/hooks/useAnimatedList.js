import { useState, useCallback, useRef, createRef } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map()); // Armazena referências para os elementos animados

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]); // Adiciona o ID da mensagem à lista de IDs pendentes de remoção
  }, []);

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems((prevState) => prevState.filter(
  //     (item) => item.id !== id, // Remove a mensagem com o ID correspondente
  //   ));
  //   setPendingRemovalItemsIds((prevState) => prevState.filter(
  //     (itemId) => itemId !== id, // Remove o ID da lista de IDs pendentes de remoção
  //   ));
  // }, []);


  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId); // Obtém a referência animada para o item atual

      if(!animatedRef) {
        animatedRef = createRef(); // Cria uma nova referência se não existir. O uso do createRef ao invés de useRef permite que cada item tenha sua própria referência única
        animatedRefs.current.set(itemId, animatedRef); // Armazena a referência no objeto
      }
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

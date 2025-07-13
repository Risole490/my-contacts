import { useState, useCallback } from 'react';

export default function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]); // Adiciona o ID da mensagem à lista de IDs pendentes de remoção
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter(
      (item) => item.id !== id, // Remove a mensagem com o ID correspondente
    ));
    setPendingRemovalItemsIds((prevState) => prevState.filter(
      (itemId) => itemId !== id, // Remove o ID da lista de IDs pendentes de remoção
    ));
  }, []);

  // Função para renderizar a lista de itens
  // O renderItem é uma função que recebe um item e retorna o JSX correspondente
  // Isso permite que você customize a renderização de cada item da lista
  const renderList = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: pendingRemovalItemsIds.includes(item.id), // Verifica se o item está na lista de remoção pendente
    }))
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  };
}

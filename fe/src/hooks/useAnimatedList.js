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

  return {
    items,
    setItems,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  };
}

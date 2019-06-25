const reorder = (items, oldIndex, newIndex) => {
  const movingItem = items[oldIndex];
  const remainingItems = items.filter((_, i) => i !== oldIndex);

  return [
    ...remainingItems.slice(0, newIndex),
    movingItem,
    ...remainingItems.slice(newIndex),
  ];
};

export default reorder;

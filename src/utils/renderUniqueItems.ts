export const renderUniqueArrayItems = (items: string[]) => {
  const itemsSet = new Set(items);
  const uniqueItems = Array.from(itemsSet);
  return uniqueItems;
};

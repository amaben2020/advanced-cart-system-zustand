// core logic here: https://bobbyhadz.com/blog/javascript-convert-array-to-set#:~:text=Use%20the%20Set()%20constructor,unique%20values%20of%20any%20type.

export const renderUniqueArrayItems = (items: string[]) => {
  const itemsSet = new Set(items);
  const uniqueItems = Array.from(itemsSet);
  return uniqueItems;
};

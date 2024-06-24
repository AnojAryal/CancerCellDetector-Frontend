//Filters items based on a given filter text and key.
export const filterItems = <T,>(
  items: T[],
  filterText: string,
  filterKey: keyof T
): T[] => {
  return items.filter((item) => {
    const itemValue = item[filterKey] as unknown as string;
    return itemValue.toLowerCase().includes(filterText.toLowerCase());
  });
};

//Sorts items based on a specified sort order and key.
export const sortItems = <T,>(
  items: T[],
  sortOrder: "asc" | "desc",
  sortKey: keyof T
): T[] => {
  return [...items].sort((a, b) => {
    const valueA = a[sortKey] as unknown as string;
    const valueB = b[sortKey] as unknown as string;
    if (sortOrder === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
};

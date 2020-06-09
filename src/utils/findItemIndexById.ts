interface Item {
  id: string;
}

// We constrained the generic type T to have the fields that are defined on the Item interface
export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((item: T) => item.id === id);
};

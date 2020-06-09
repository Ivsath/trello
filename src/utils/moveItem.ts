// To work with arrays with any kind of items in them, we use a generic type T
export const moveItem = <T>(array: T[], from: number, to: number) => {
  // We make sure that it’s always a positive number.
  // If our destination index is smaller than zero - we use array length plus the destination index.
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];

  array.splice(startIndex, 0, item);

  return array;
};

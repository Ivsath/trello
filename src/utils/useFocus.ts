import { useRef, useEffect } from 'react';

// Refs provide a way to access the actual DOM nodes of rendered React elements.
// Here we use the useRef hook to get access to the rendered input element.
// Typescript can’t automatically know what will be the element type.So we provide the actual type to it.
export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  });

  return ref;
};

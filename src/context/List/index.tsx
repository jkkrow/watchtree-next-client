import {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from 'react';

export interface ListContextState<T = any, K = string> {
  label?: K;
  items: T[];
  filterItems: (id: string) => void;
}

const initialState: ListContextState = {
  label: '',
  items: [],
  filterItems: () => {},
};

export const ListContext = createContext(initialState);

interface ListContextProps {
  label?: string;
  items: any[];
}

export function ListContextProvider({
  label,
  items: initialItems,
  children,
}: PropsWithChildren<ListContextProps>) {
  const [items, setItems] = useState(initialItems);

  const filterItems = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <ListContext.Provider
      value={{
        label,
        items: !items.length ? initialItems : items,
        filterItems,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

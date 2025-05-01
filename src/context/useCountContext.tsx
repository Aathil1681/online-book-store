"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const CountContext = createContext<{
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}>({
  count: 0,
  setCount: () => {},
});

const TitleContext = createContext<{
  title: Dispatch<SetStateAction<string>>;
} | null>(null);

const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

const useCount = () => {
  const context = useContext(CountContext);

  if (!context) {
    throw "The component is not suitable";
  }

  return context;
};

export { CountContext, TitleContext, CountProvider, useCount };

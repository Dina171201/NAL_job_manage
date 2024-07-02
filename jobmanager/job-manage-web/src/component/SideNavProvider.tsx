"use client";
import {
  FC,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

interface SidebarValueProps {
  isOpen: boolean;
  container: RefObject<HTMLDivElement> | null;
  token: string | null;
  loading: boolean;
}

interface SidebarContextProps {
  value: SidebarValueProps;
  setValue: (data: Partial<SidebarValueProps>) => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  value: {
    isOpen: false,
    container: null,
    token: null,
    loading: true,
  },
  setValue: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [value, setValue] = useState<SidebarValueProps>({
    isOpen: false,
    container: useRef<HTMLDivElement>(null),
    token: null,
    loading: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('accessToken');
      setValue((prev) => ({
        ...prev,
        token,
        loading: false,
      }));
    }
  }, []);

  const setContextValue = (data: Partial<SidebarValueProps>) => {
    setValue((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <SidebarContext.Provider
      value={{ value: value, setValue: setContextValue }}
    >
      <div>{children}</div>
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);

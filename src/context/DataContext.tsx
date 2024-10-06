import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';

type DataType = { id: number; title: string; body: string };

interface DataContextType {
  data: DataType[];
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  updateData: (id: number, newTitle: string, newBody: string) => void;
  addData: (title: string, body: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  const updateData = (id: number, newTitle: string, newBody: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, title: newTitle, body: newBody } : item
      )
    );
  };

  const addData = (title: string, body: string) => {
    const newItem = {
      id: data.length + 1,
      title,
      body,
    };
    setData([...data, newItem]);
  };

  return (
    <DataContext.Provider value={{ data, setData, updateData, addData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};

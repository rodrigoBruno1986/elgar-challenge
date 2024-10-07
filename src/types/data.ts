export interface DataItem {
  id: number;
  title: string;
  body: string;
}

export type DataContextType = {
  data: DataItem[];
  updateData: (id: number, newTitle: string, newBody: string) => void;
  addData: (title: string, body: string) => void;
};

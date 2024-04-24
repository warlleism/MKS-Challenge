import { create } from "zustand";
import { IProducts } from "../interfaces/IProducts";

interface StoreState {
  products: IProducts[];
  addItems: (newItems: IProducts[]) => void;
}

const useStore = create<StoreState>((set) => ({
  products: [],

  addItems: (newItems) =>
    set((state) => ({ products: [...newItems] })),
}));

export default useStore;
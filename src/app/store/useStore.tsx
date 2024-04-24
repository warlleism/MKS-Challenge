import create from "zustand";
import { IProducts } from "../interfaces/IProducts";

interface StoreState {
  cart: boolean;
  products: IProducts[];
  showCart: () => void;
  cartProducts: IProducts[];
  addItemCart: (newItems: IProducts[]) => void;
  addItems: (newItems: IProducts[]) => void;
}

const useStore = create<StoreState>((set) => ({
  products: [],
  cart: false,
  cartProducts: [],

  addItems: (newItems) =>
    set((state) => ({ products: [...state.products, ...newItems] })),

  addItemCart: (newItems) => {
    if (!Array.isArray(newItems)) {
      newItems = [newItems];
    }

    set((state) => {
      const filteredNewItems = newItems.filter(newItem => {
        return !state.cartProducts.some(existingItem => existingItem.id === newItem.id);
      });

      return { cartProducts: [...state.cartProducts, ...filteredNewItems] };
    });
  },

  showCart: () =>
    set((state) => ({ cart: !state.cart })),
}));

export default useStore;

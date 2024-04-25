import { create } from "zustand";
import { IProducts } from "../interfaces/IProducts";

interface StoreState {
  cart: boolean;
  products: IProducts[];
  showCart: () => void;
  cartProducts: IProducts[];
  addItemCart: (newItems: IProducts[]) => void;
  removeItemCart: (id: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
}

const useStore = create<StoreState>((set) => ({
  products: [],
  cart: false,
  cartProducts: [],


  addItemCart: (newItems) => {
    if (!Array.isArray(newItems)) { newItems = [newItems] }

    set((state) => {
      const filteredNewItems = newItems.filter(newItem => {
        return !state.cartProducts.some(existingItem => existingItem.id === newItem.id);
      });
      const itemsWithQuantity = filteredNewItems.map(item => ({ ...item, quantity: 1 }));

      return { cartProducts: [...state.cartProducts, ...itemsWithQuantity] };
    });
  },

  removeItemCart: (id: string) => {
    set((state) => {
      const itemToRemove = state.cartProducts.filter(item => item.id !== id);
      return { cartProducts: itemToRemove };
    });
  },

  incrementQuantity: (productId) => {
    set((state) => ({
      cartProducts: state.cartProducts.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 0) + 1, valorTotal: item.price * ((item.quantity || 0) + 1) }
          : item
      ),
    }));
  },

  decrementQuantity: (productId) => {
    set((state) => ({
      cartProducts: state.cartProducts.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity: Math.max((item.quantity || 1) - 1, 1),
            valorTotal: item.price * Math.max(((item.quantity || 1) - 1), 1)
          }
          : item
      ),
    }));
  },


  showCart: () =>
    set((state) => ({ cart: !state.cart })),
}));


export default useStore;

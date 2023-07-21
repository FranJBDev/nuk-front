const { createContext, useState, useEffect } = require('react');

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  // We check if exist local storage data
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);

  // if we have products in cart state we save them in localstorage
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // if there are products in local storage we put them in cart state
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

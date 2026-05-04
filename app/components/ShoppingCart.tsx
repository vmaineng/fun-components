"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts = [
  { id: 1, name: "car", price: 10000, stock: 5 },
  { id: 2, name: "bike", price: 500, stock: 10 },
  { id: 3, name: "phone", price: 800, stock: 15 },
  { id: 4, name: "laptop", price: 1500, stock: 8 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p,
      ),
    );
  };

  const removeCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quanity, 0);
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.stock}</p>
          <button
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}

      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.quantity}</p>
          <button onClick={() => removeCart(item.id)}>Remove</button>
        </div>
      ))}

      <span>Total: ${total} </span>
    </div>
  );
}

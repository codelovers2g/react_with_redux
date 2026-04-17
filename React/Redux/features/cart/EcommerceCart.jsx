/**
 * Latest Version Used: Redux Toolkit 2.11.2, React 19.2.5
 * File Purpose: Main E-commerce Component demonstrating React 19 + Redux
 */

import React, { useActionState, useOptimistic, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetProductsQuery } from '../products/productsApi';
import { addToCart, selectCartItems, selectCartTotal } from './cartSlice';

const EcommerceCart = () => {
  const dispatch = useAppDispatch();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [isPending, startTransition] = useTransition();

  // React 19: useOptimistic for immediate UI feedback
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartItems,
    (state, newItem) => [...state, { ...newItem, quantity: 1, id: Date.now() }]
  );

  // React 19: useActionState for form-based actions (Checkout Example)
  const [formState, checkoutAction, isSaving] = useActionState(
    async (previousState, formData) => {
      await new Promise(res => setTimeout(res, 1000));
      return { success: true, message: 'Order placed successfully!' };
    },
    { success: false, message: '' }
  );

  const handleAddToCart = (product) => {
    startTransition(() => {
      setOptimisticCart(product);
      dispatch(addToCart(product));
    });
  };

  if (isLoading) return <div className="p-4">Loading Catalog...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading products.</div>;

  return (
    <div className="ecommerce-container p-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans bg-white min-h-screen">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Product Catalog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products?.map((product) => (
            <div key={product.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors w-full"
              >
                {isPending ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary bg-gray-50 p-6 rounded-2xl border shadow-lg h-fit sticky top-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🛒 Your Cart</h2>
        {optimisticCart.length === 0 ? (
          <p className="text-gray-500 italic">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3 mb-6">
            {optimisticCart.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
                <span>{item.name}</span>
                <span className="font-mono font-bold">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total:</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
          <form action={checkoutAction}>
            <button
              type="submit"
              disabled={isSaving || optimisticCart.length === 0}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 shadow-md transition-all disabled:opacity-50"
            >
              {isSaving ? 'Processing Checkout...' : 'Place Secure Order'}
            </button>
            {formState.success && (
              <p className="mt-4 text-center text-green-700 bg-green-100 p-2 rounded-lg text-sm">{formState.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EcommerceCart;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { addToCart } from '@/lib/features/counterSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
//  const addToCart = (item) => {
//     console.log("Add to cart working....");
//     const ExistingCartItem = cartItems.find(
//       (cartItem) => cartItem.id === item.id,
//     );
//     if (ExistingCartItem && ExistingCartItem.quantity >= item.stock) {
//       alert("Maximum stock reached!");
//       return;
//     }
//     if (ExistingCartItem) {
//       setcartItems(
//         cartItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem,
//         ),
//       );
//     } else {
//       setcartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };
const Page = () => {
    const [products, setproducts] = useState([])
    useEffect(() => {
        const productsList = async () => {
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()
            // console.log("Products list data", data.products)
            setproducts(data.products)
        }
        productsList()
    }, [])
    const dispatch = useDispatch()
    // const addToCart = () => { }
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mt-5'>
                <h1>Products</h1>
                <div className='grid grid-cols-3 gap-5'>
                    {products.map((item: any) => (
                        <div key={item.id} className='border border-gray-300 p-4 space-y-3'>
                            <div>
                                <h1 className='text-lg font-bold'>
                                    {item.title}
                                </h1>
                                <h2 className='text-sm font-normal text-gray-500'>
                                    ${item.price}
                                </h2>
                            </div>
                            <div>
                                <button className='bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md cursor-pointer text-white font-bold' onClick={() =>
                                    dispatch(addToCart(item))
                                }> + Cart </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page

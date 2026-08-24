"use client";

import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "@/lib/features/counterSlice";
import { RootState } from "@/lib/store";

const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    );

    return (
        <div className="my-5">
            <h1 className="text-2xl font-bold text-center">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center mt-20 text-2xl text-gray-400">Your cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="border border-gray-400 rounded-sm shadow-sm mx-5 mt-3 p-4 mb-3 space-y-3">
                        <h2 className="text-lg font-bold">{item.title}</h2>

                        <p>${item.price}</p>

                        <div className="flex gap-3 items-center">
                            <button onClick={() => dispatch(decreaseQuantity(item.id))} className="bg-red-500 font-bold text-white px-5 py-1">
                                -
                            </button>

                            <span className="text-2xl font-bold">{item.quantity}</span>

                            <button onClick={() => dispatch(increaseQuantity(item.id))} className="bg-blue-500 font-bold text-white px-5 py-1">
                                +
                            </button>
                        </div>

                        <button onClick={() => dispatch(removeFromCart(item.id))} className="border border-red-400 text-red-400 cursor-pointer mt-2 p-2">
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
"use client"
import React, { useEffect, useState } from 'react'

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
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mt-5'>
                <h1>Products</h1>
                <div className='grid grid-cols-3 gap-5'>
                    {products.map((item: any) => (
                        <div key={item.id} className='border border-gray-300 p-4'>
                            <h1 className='text-lg font-bold'>
                                {item.title}
                            </h1>
                            <h2 className='text-sm font-normal text-gray-500'>
                                ${item.price}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page

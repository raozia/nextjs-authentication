'use client'
import { RootState } from '@/lib/store';
import Link from 'next/link'
import { useSelector } from 'react-redux';

const NavBar = () => {
    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    );

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    return (
        <div className='border border-gray-300'>
            <div className='flex justify-between items-center py-2 px-4'>
                <div>
                    <Link href={'/home'}>LOGO</Link>
                </div>
                <div>
                    <div className='flex gap-4'>
                        <Link href={'/products'} className='bg-blue-500 hover:to-blue-700 text-white p-2 rounded-sm'>Products</Link>
                        <Link href={'/#'} className=' bg-blue-500 hover:to-blue-700 text-white p-2 rounded-sm'>Notification</Link>
                        <Link href={'/cart'} className='bg-blue-500 hover:to-blue-700 text-white p-2 rounded-sm'>Cart {cartCount}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar

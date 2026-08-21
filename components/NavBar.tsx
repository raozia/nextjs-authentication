'use client'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div>
            <div className='flex justify-between py-2 px-4'>
                <div>
                    <Link href={'/home'}>LOGO</Link>
                </div>
                <div>
                    <div className='flex gap-4'>
                        <Link href={'/products'} className='bg-amber-200 text-black p-2 rounded-sm'>Products</Link>
                        <Link href={'/#'} className=' bg-amber-200 text-black p-2 rounded-sm'>Notification</Link>
                        <Link href={'/#'} className='bg-amber-200 text-black p-2 rounded-sm'>Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar

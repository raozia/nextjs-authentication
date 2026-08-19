'use client'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div>
            <div className='flex justify-between py-2 px-4'>
                <div>
                    <h1>LOGO</h1>
                </div>
                <div>
                    <div className='flex gap-4'>
                        <Link href={'/#'} className=' bg-amber-200 text-black p-2 rounded-sm'>Notification</Link>
                        <Link href={'/#'} className='bg-amber-200 text-black p-2 rounded-sm'>Cart</Link>
                        <Link href={'/#'} className='bg-amber-200 text-black p-2 rounded-sm'>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar

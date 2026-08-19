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
                        <Link href={'/#'}>Notification</Link>
                        <Link href={'/#'}>Cart</Link>
                        <Link href={'/#'}>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar

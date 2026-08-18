'use client'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div>
            <div className=''>
                <div>
                    <h1>LOGO</h1>
                </div>
                <div>
                    <div>
                        <Link href={'/#'}>Notification</Link>
                        <Link href={'/#'}>Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar

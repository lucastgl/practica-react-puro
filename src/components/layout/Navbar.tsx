import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
            isActive
                ? 'bg-green-400 text-gray-900'
                : 'text-gray-300 hover:text-green-400'
        }`;

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700'>
            <div className='max-w-6xl mx-auto px-6 h-14 flex items-center justify-between'>
                <NavLink to='/characters' className='text-green-400 font-bold text-lg tracking-wide'>
                    Rick & Morty
                </NavLink>
                <div className='flex gap-2'>
                    <NavLink to='/characters' className={linkClass}>Characters</NavLink>
                    <NavLink to='/locations' className={linkClass}>Locations</NavLink>
                    <NavLink to='/episodes' className={linkClass}>Episodes</NavLink>
                    <NavLink to='/favorites' className={linkClass}>Favorites</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
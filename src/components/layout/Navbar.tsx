import { Link } from 'react-router-dom'
const Navbar = () => {

    return (
        <nav className='navbar fixed-top'>
            <div>
                <Link to='/'>home</Link>
            </div>
            <div>
                <Link to='/character'>Character</Link>
                <Link to='/location'>Location</Link>
                <Link to='/episodes'>Episodes</Link>
            </div>
        </nav>
    )
}

export default Navbar;
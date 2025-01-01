import { Link } from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="links">
                <Link to="/">
                    <h3>
                        Gig_Economy
                    </h3>
                </Link>
            </div>
            <nav>
                {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
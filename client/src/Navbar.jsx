import { useState } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useAuth } from './AuthContext'
import AdminLoginModal from './AdminLoginModal'

export default function Navbar() {
    const { isAdmin, logout } = useAuth()
    const [loginOpen, setLoginOpen] = useState(false)

    return (
        <nav className="nav">
            <Link to="/" className="logo">
                Logo
            </Link>
            <ul>
                <CustomLink to="/">About</CustomLink>
                <CustomLink to="/artworks">Artworks</CustomLink>
                <CustomLink to="/commission">Services</CustomLink>
                <CustomLink to="/contact">Contact</CustomLink>
                <li>
                    {isAdmin ? (
                        <button className="nav__auth-btn" onClick={logout}>
                            Log out
                        </button>
                    ) : (
                        <button className="nav__auth-btn" onClick={() => setLoginOpen(true)}>
                            Login
                        </button>
                    )}
                </li>
            </ul>

            {loginOpen && <AdminLoginModal onClose={() => setLoginOpen(false)} />}
        </nav>
    )
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
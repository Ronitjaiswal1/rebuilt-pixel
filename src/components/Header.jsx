import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';

const Header = () => {
    return (
        <header className="header glass-panel">
            <div className="container flex-center" style={{ justifyContent: 'space-between', height: '100%' }}>
                <Link to="/" className="logo">
                    <span className="text-gradient" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>PIXEL.</span>
                </Link>

                <nav className="nav-desktop">
                    <ul className="flex-center" style={{ gap: '2rem' }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>

                <div className="actions flex-center" style={{ gap: '1rem' }}>
                    <button aria-label="Cart">
                        <ShoppingBag size={24} />
                    </button>
                    <button className="mobile-menu-toggle" aria-label="Menu" style={{ display: 'none' }}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

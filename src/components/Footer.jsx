import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>PIXEL.</h3>
                        <p className="text-secondary" style={{ maxWidth: '300px' }}>
                            Empowering creators with high-quality digital assets. Built for the future of web design.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 style={{ marginBottom: '1.5rem' }}>Product</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            <li><Link to="/shop">All Products</Link></li>
                            <li><Link to="/shop/ui-kits">UI Kits</Link></li>
                            <li><Link to="/shop/icons">Icons</Link></li>
                            <li><Link to="/shop/templates">Templates</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 style={{ marginBottom: '1.5rem' }}>Company</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 style={{ marginBottom: '1.5rem' }}>Legal</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                            <li><Link to="/license">License</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} PIXEL. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

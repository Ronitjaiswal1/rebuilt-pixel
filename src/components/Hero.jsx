import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero-section container">
            <div className="hero-bg-glow" />

            <div className="flex-center" style={{ marginBottom: '1rem' }}>
                <span className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', color: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={16} fill="currentColor" />
                    <span>Next Gen Assets Available Now</span>
                </span>
            </div>

            <h1 className="hero-title">
                Elevate Your Digital <br />
                <span className="text-gradient">Experience</span>
            </h1>

            <p className="hero-subtitle">
                Premium UI kits, 3D assets, and templates designed for the modern web.
                Crafted for creators who demand excellence.
            </p>

            <div className="hero-cta-group">
                <Link to="/shop" className="btn-primary" style={{
                    background: 'var(--color-text-primary)',
                    color: 'var(--color-bg-primary)',
                    padding: '0.75rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    Explore Products <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn-secondary" style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--color-text-primary)',
                    padding: '0.75rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                }}>
                    Learn More
                </Link>
            </div>
        </section>
    );
};

export default Hero;

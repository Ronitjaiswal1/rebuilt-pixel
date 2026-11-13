import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const Home = () => {
    const featuredProducts = products.slice(0, 3);

    return (
        <div className="home-page">
            <Hero />
            <ProductGrid title="Featured Collection" products={featuredProducts} />

            <section className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2 className="section-title text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Why Choose PIXEL?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Premium Quality</h3>
                        <p className="text-secondary">Every asset is meticulously crafted for high-end projects.</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Instant Access</h3>
                        <p className="text-secondary">Download your files immediately after purchase.</p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Support</h3>
                        <p className="text-secondary">Dedicated support to help you get the most out of our products.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

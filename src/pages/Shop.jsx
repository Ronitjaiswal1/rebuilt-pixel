import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const Shop = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="shop-page" style={{ paddingTop: 'var(--header-height)' }}>
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '3rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Explore Assets</h1>
                    <p className="text-secondary">Discover the best tools for your next big idea.</p>
                </div>

                <div className="filters flex-center" style={{ gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '999px',
                                background: filter === cat ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.05)',
                                color: filter === cat ? '#000' : 'var(--color-text-primary)',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <ProductGrid products={filteredProducts} />
        </div>
    );
};

export default Shop;

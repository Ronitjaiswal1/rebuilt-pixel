import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title }) => {
    return (
        <section className="product-grid-section" style={{ padding: 'var(--spacing-16) 0' }}>
            <div className="container">
                {title && <h2 className="section-title" style={{ marginBottom: 'var(--spacing-8)', fontSize: '2rem' }}>{title}</h2>}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--spacing-6)'
                }}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;

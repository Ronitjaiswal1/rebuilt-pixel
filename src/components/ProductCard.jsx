import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card glass-panel">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                />
                <div className="product-overlay" />
            </div>

            <div className="product-info" style={{ padding: 'var(--spacing-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 'auto' }}>
                    <span style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-accent-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '600'
                    }}>{product.category}</span>
                    <h3 style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>{product.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        {product.description}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${product.price}</span>
                    <button className="card-btn-icon" aria-label="Add to cart">
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

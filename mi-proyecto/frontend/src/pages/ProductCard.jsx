import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const discountPercentage = product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    return (
        <Card className="product-card h-100">
            {product.discountPrice && (
                <Badge bg="danger" className="discount-badge">
                    -{discountPercentage}%
                </Badge>
            )}

            <div className="product-image-container">
                <Card.Img
                    variant="top"
                    src={product.imageUrl || '/images/placeholder.jpg'}
                    alt={product.name}
                />
                <div className="product-overlay">
                    <Button variant="light" className="action-btn">
                        <FaHeart />
                    </Button>
                    <Button variant="light" className="action-btn">
                        <FaShoppingCart />
                    </Button>
                </div>
            </div>

            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                    {product.category?.name}
                </Card.Subtitle>

                <Card.Title className="product-title">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </Card.Title>

                <div className="price-container">
                    {product.discountPrice ? (
                        <>
                            <span className="original-price text-muted">
                                S/ {product.price.toFixed(2)}
                            </span>
                            <span className="discount-price">
                                S/ {product.discountPrice.toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span className="current-price">
                            S/ {product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="rating">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={i < Math.floor(product.rating || 0) ? 'star filled' : 'star'}
                        >
                            ★
                        </span>
                    ))}
                    <span className="review-count">({product.reviewCount || 0})</span>
                </div>

                <Button
                    variant="primary"
                    className="w-100 mt-2"
                    onClick={() => console.log('Add to cart', product.id)}
                >
                    Agregar al Carrito
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
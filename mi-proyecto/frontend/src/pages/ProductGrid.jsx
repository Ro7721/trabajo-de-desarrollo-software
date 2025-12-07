import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { getProducts } from '../services/api';
import './ProductGrid.css';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        category: '',
        sortBy: 'newest',
        search: ''
    });

    useEffect(() => {
        fetchProducts();
    }, [page, filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                size: 12,
                ...filters
            });

            const response = await getProducts(params);
            setProducts(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
        setPage(0);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <Row>
                <Col lg={3} className="mb-4">
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </Col>

                <Col lg={9}>
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {products.map(product => (
                            <Col key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination>
                                <Pagination.First
                                    onClick={() => setPage(0)}
                                    disabled={page === 0}
                                />
                                <Pagination.Prev
                                    onClick={() => setPage(p => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                />

                                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                    const pageNum = Math.max(0, Math.min(
                                        page - 2 + i,
                                        totalPages - 5
                                    )) + i;

                                    if (pageNum >= 0 && pageNum < totalPages) {
                                        return (
                                            <Pagination.Item
                                                key={pageNum}
                                                active={pageNum === page}
                                                onClick={() => setPage(pageNum)}
                                            >
                                                {pageNum + 1}
                                            </Pagination.Item>
                                        );
                                    }
                                    return null;
                                })}

                                <Pagination.Next
                                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                    disabled={page === totalPages - 1}
                                />
                                <Pagination.Last
                                    onClick={() => setPage(totalPages - 1)}
                                    disabled={page === totalPages - 1}
                                />
                            </Pagination>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductGrid;
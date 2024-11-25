import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import ProductCard from './ProductCard';
import { baseUrl } from '../assets/constant';

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handlePriceFilterChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPriceRanges((prev) => {
            if (checked) {``
                return [...prev, value];
            } else {
                return prev.filter((range) => range !== value);
            }
        });
    };

    const handleCategoryFilterChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories((prev) => {
            return checked ? [...prev, value] : prev.filter((category) => category !== value);
        });
    };

    const toggleFilter = () => {
        setIsFilterEnabled((prev) => !prev);
    };

    const fetchProducts = async (page) => {
        try {
            setIsLoading(true);
            const priceRangeParam = selectedPriceRanges.join(',');
            const categoryParam = selectedCategories.join(',');

            const { data } = await axios.get(`${baseUrl}/product/all`, {
                params: { priceRange: priceRangeParam, category: categoryParam, page, limit: 10 },
            });

            setProducts((prev) => [...prev, ...data.products]);

            if (page >= data.totalPages) {
                setCurrentPage(1); 
            } else {
                setCurrentPage((prevPage) => prevPage + 1); 
            }

            setHasMore(true); 
        //     if (page >= data.totalPages) setCurrentPage(1);
        //     else setCurrentPage((prevPage) => prevPage + 1);

        //     setHasMore(true);
        // } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        setProducts([]);
        fetchProducts(1);
    }, [selectedPriceRanges, selectedCategories]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                    document.documentElement.scrollHeight &&
                !isLoading
            ) {
                fetchProducts(currentPage);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage, isLoading]);

    return (
        <MDBContainer
            fluid
            className="my-5 p-5"
            style={{
                backgroundColor: '#D4D8DD',
                borderRadius: '15px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Header */}
            <h1
                className="text-center mb-4"
                style={{
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    color: '#1A2D42',
                }}
            >
                Start Booking Your Tickets!
            </h1>

            {/* Filter Button */}
            <MDBRow className="mb-4">
                <MDBCol md="12" className="text-center">
                    <MDBBtn
                        onClick={toggleFilter}
                        color={isFilterEnabled ? 'danger' : 'primary'}
                        className="rounded-pill px-4 py-2"
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: isFilterEnabled ? '#2E4156' : '#1A2D42',
                            borderColor: 'transparent',
                        }}
                    >
                        {isFilterEnabled ? 'Close Filter' : 'Filter'}
                    </MDBBtn>
                </MDBCol>
            </MDBRow>

            {/* Filters Section */}
            {isFilterEnabled && (
                <MDBRow
                    className="mb-4 p-4"
                    style={{
                        backgroundColor: '#AAB7B7',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <MDBCol md="6" className="mb-4">
                        <h5 style={{ color: '#1A2D42' }}>Filter by Price:</h5>
                        {['100-5000', '5000-10000', '10000-15000', '15000-20000'].map((range, idx) => (
                            <div className="mb-2" key={idx}>
                                <MDBCheckbox value={range} label={range} onChange={handlePriceFilterChange} />
                            </div>
                        ))}
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 style={{ color: '#1A2D42' }}>Filter by Category:</h5>
                        {['VIP Standing', 'Upper Box A', 'Upper Box B', 'Lower Box A', 'Lower Box B', 'Gen Ad'].map((category, idx) => (
                            <div className="mb-2" key={idx}>
                                <MDBCheckbox value={category} label={category} onChange={handleCategoryFilterChange} />
                            </div>
                        ))}
                    </MDBCol>
                </MDBRow>
            )}

            {/* Product Cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '15px', // Space between cards
                    justifyContent: 'center',
                    alignItems: 'start',
                }}
            >
                {products.map((product, index) => (
                    <ProductCard
                        key={`${product._id}-${index}`}
                        product={product}
                        style={{
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            backgroundColor: '#f8f9fa',
                        }}
                    />
                ))}
            </div>
            {isLoading && <p className="text-center mt-4 text-secondary">Loading...</p>}
        </MDBContainer>
    );
}

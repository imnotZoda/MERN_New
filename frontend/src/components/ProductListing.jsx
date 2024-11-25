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

    // Handle price filter change
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

    // Handle category filter change
    const handleCategoryFilterChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter((category) => category !== value);
            }
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
                params: {
                    priceRange: priceRangeParam,
                    category: categoryParam,
                    page,
                    limit: 10,
                },
            });

            setProducts((prev) => [...prev, ...data.products]);

            if (page >= data.totalPages) {
                setCurrentPage(1); 
            } else {
                setCurrentPage((prevPage) => prevPage + 1); 
            }

            setHasMore(true); 
        } catch (err) {
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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, isLoading]);

    return (
        <MDBContainer fluid className="my-5">
            <MDBRow className="mb-4">
                <MDBCol md="12">
                    <MDBBtn onClick={toggleFilter} color={isFilterEnabled ? 'danger' : 'success'}>
                        {isFilterEnabled ? 'Disable Filter' : 'Enable Filter'}
                    </MDBBtn>
                </MDBCol>
            </MDBRow>

            {isFilterEnabled && (
                <MDBRow className="mb-4">
                    <MDBCol md="6" className="mb-4">
                        <h5>Filter by Price:</h5>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="100-5000"
                                label="100 - 5000"
                                onChange={handlePriceFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="5000-10000"
                                label="5000 - 10000"
                                onChange={handlePriceFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="10000-15000"
                                label="10000 - 15000"
                                onChange={handlePriceFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="15000-20000"
                                label="15000 - 20000"
                                onChange={handlePriceFilterChange}
                            />
                        </div>
                    </MDBCol>

                    <MDBCol md="6">
                        <h5>Filter by Category:</h5>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="VIP Standing"
                                label="VIP Standing"
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="Upper Box A"
                                label="Upper Box A"
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="Upper Box B"
                                label="Upper Box B"
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="Lower Box A"
                                label="Lower Box A"
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="Lower Box B"
                                label="Lower Box B"
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
                        <div className="mb-3">
                            <MDBCheckbox
                                value="Gen Ad"
                                label="Gen Ad"
                                onChange={handleCategoryFilterChange}
                            />
                        </div>
                    </MDBCol>
                </MDBRow>
            )}

            <MDBRow>
                <MDBCol md="12">
                    <div className="d-flex gap-4 flex-wrap justify-content-center">
                        {products.map((product, index) => (
                            <ProductCard key={`${product._id}-${index}`} product={product} />
                        ))}
                    </div>
                    {isLoading && <p className="text-center mt-4">Loading...</p>}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

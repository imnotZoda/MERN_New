import React from 'react';
import UserNavBar from './layouts/UserNavBar';
import ProductListing from './components/ProductListing';

export default function Product() {
    return (
        <>
            <UserNavBar />
            <div>
                <ProductListing />
            </div>
        </>
    );
}

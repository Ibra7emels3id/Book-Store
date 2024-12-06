import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Products from '../components/Products';

const Page = () => {
    return (
        <>
            <Header />
                <Products />
            <Footer />
        </>
    );
}

export default Page;

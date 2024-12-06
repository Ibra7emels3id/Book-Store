import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Products from '@/app/components/Products';
import React from 'react';
import FilterProducts from './_components/FilterProducts';

const Page = () => {
    return (
        <>
            <Header />
                <FilterProducts />
            <Footer />
        </>
    );
}

export default Page;

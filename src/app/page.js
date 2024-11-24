'use client'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../FirebaseConfig';
import Loading from './components/Loading';
import dynamic from 'next/dynamic';


const Hero = dynamic(() => import('./components/Hero'), {
    loading: () => <Loading />,
});
const Header = dynamic(() => import('./components/Header'), {
    loading: () => <Loading />,
});
const Footer = dynamic(() => import('./components/Footer'), {
    loading: () => <Loading />,
});
const HeroImage = dynamic(() => import('./components/HeroImage'), {
    loading: () => <Loading />,
});
const Products = dynamic(() => import('./components/Products'), {
    loading: () => <Loading />,
});



const Page = () => {
    const [user, loading, error] = useAuthState(auth);


    if (error) {
        return <p>An error occurred: {error.message}</p>
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <Hero />
            <HeroImage />
            <Products />
            <Footer />
        </>
    );
}

export default Page;

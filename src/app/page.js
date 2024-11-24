'use client'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../FirebaseConfig';
import Loading from './components/Loading';
import dynamic from 'next/dynamic';






const Page = () => {
    const [user, loading, error] = useAuthState(auth);


    const Hero = dynamic(() => import('./components/Hero'));
    const Header = dynamic(() => import('./components/Header'));
    const Footer = dynamic(() => import('./components/Footer'));
    const HeroImage = dynamic(() => import('./components/HeroImage'));
    const Products = dynamic(() => import('./components/Products'));


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

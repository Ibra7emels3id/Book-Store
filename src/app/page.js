'use client'
import Link from 'next/link';
import React from 'react';
import Header from './components/Header';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import Hero from './components/Hero';
import HeroImage from './components/HeroImage';
import ProductsSlider from './components/ProductsSlider';
import About from './components/About';
import Products from './components/Products';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../FirebaseConfig';
import Loading from './components/Loading';
import Footer from './components/Footer';

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
            <Header user={user} />
            <Hero />
            <HeroImage />
            <Products />
            <Footer />
        </>
    );
}

export default Page;

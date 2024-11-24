'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import { Rating } from '@mui/material';
import Link from 'next/link';
import Category from './Category';


const Products = () => {
    const [products, setProducts] = React.useState([]);

    // fetch products
    const GetData = async () => {
        // Fetch data from API
        const querySnapshot = await getDocs(collection(db, "products"));
        const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setProducts(docs)
    }


    // Handle Use Effect
    useEffect(() => {
        GetData();
    }, [])


    return (
        <>
            <div className='w-[95%] lg:w-[90%] m-auto mt-10 px-1'>
                <div className="flex w-full gap-5">
                    <div className="flex flex-col w-full lg:w-[83%]">
                        <div className="flex w-full justify-around items-center flex-wrap bg-white border h-[120px] rounded-xl">
                            <div className="group">
                                <button className='flex flex-col items-center justify-center gap-3 group-hover:text-green1'>
                                    <Image src={'/assets/images/new_books1.svg'} width={50} height={50} alt={"احدث الكتب"} />
                                    <span className='text-xl text-center font-semibold'>الاشهر اليوم</span>
                                </button>
                            </div>
                            <div className="group">
                                <button className='flex flex-col gap-3 items-center justify-center group-hover:text-green1'>
                                    <Image src={'/assets/images/new_books1.svg'} width={50} height={50} alt={"احدث الكتب"} />
                                    <span className='text-xl text-center font-semibold'> أشهر الكتب</span>
                                </button>
                            </div>
                            <div className="group">
                                <button className='flex flex-col gap-3 items-center justify-center group-hover:text-green1'>
                                    <Image src={'/assets/images/new_books1.svg'} width={50} height={50} alt={"احدث الكتب"} />
                                    <span className='text-xl text-center font-semibold'>أحدث الكتب</span>
                                </button>
                            </div>
                        </div>
                        <div className="font-[sans-serif] py-4 mx-auto w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                {products.map((it) => {
                                    return (
                                        <Link href={`/store/${it.id}`} key={it.id} className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 hover:border-greenbg border transition-all relative">
                                            <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                                                <Image src={'/assets/images/download-removebg-preview.png'} width={40} height={40} alt={"احدث الكتب"} />
                                            </div>
                                            <div className="h-[260px] w-full m-auto p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 flex items-center justify-center">
                                                <Image
                                                    src={it.image}
                                                    width={100}
                                                    height={100}
                                                    alt="Product 1"
                                                    className="h-full min-w-40 mt-5 w-full object-contain"
                                                />
                                            </div>
                                            <div className="p-6 bg-white">
                                                <h3 className="text-lg font-bold text-gray-800">{it.title}</h3>
                                                <div className="flex space-x-2 mt-4">
                                                    <Rating className='' name='rating' value={it?.rating || 0} size="small" readOnly />
                                                </div>
                                                <Link href={'/'} className="text-lg text-center mt-5 text-green1 font-bold">{it.author}</Link>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <Category />
                </div>
            </div>
        </>
    );
}

export default Products;

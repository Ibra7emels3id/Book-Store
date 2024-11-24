'use client'
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import React, { use, useEffect, useState } from 'react';
import { db } from '../../../../FirebaseConfig';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Category from '@/app/components/Category';
import Loading from '@/app/components/Loading';
import Dialog from './_components/Dialog';

const Page = ({ params }) => {
    const [current , setCurrent] = useState('hidden');
    const [dataDownloaded, setDataDownloaded] = useState(null);
    const [Namepdf, setNamePdf] = useState(null);
    const { PostId } = use(params);
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Get product and set loading
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", PostId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("No such product!");
                }
            } catch (err) {
                setError("Error fetching product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [PostId]);


    // Handle Download pdf
    const HandleDownLoadPdf = (pdf) => {
        if (current === 'flex') {
            setCurrent('hidden')
            setDataDownloaded(null)
            setNamePdf(null)
        }else{
            setCurrent('flex')
            setDataDownloaded(pdf)
            setNamePdf(product.title)
        }
    };


    // Set Loading state
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
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
                            <div className="flex bg-white  rounded-xl p-10 border gap-6 w-full">
                                <div className="grid grid-cols-1 xl:grid-cols-3 xl:flex-row gap-4 h-full">
                                    <div className="image">
                                        <Image src={product?.image || '/public/window.svg'} width={500} height={100} alt={product?.title || 'image-book'} className='rounded-xl w-[300px]' />
                                    </div>
                                    <div className="text xl:col-span-2 flex flex-col gap-5 py-2">
                                        <div className="title">
                                            <h1 className='text-4xl font-bold text-green1'>العنوان: {product?.title}</h1>
                                        </div>
                                        <div className="price">
                                            <span className='text-xl font-semibold'>المؤلف: {product?.author}</span>
                                        </div>
                                        <div className="price">
                                            <span className='text-xl font-semibold'>اللغه: {product?.language}</span>
                                        </div>
                                        <div className="price">
                                            <span className='text-xl font-semibold'>نوع الملف: {product?.typeFile}</span>
                                        </div>
                                        <div className="price">
                                            <span className='text-xl font-semibold'>تاريخ النشر: {product?.date}</span>
                                        </div>
                                        <div className="rating flex items-center gap-2 font-bold text-xl">
                                            التقيم:<Rating name="read-only" value={product?.rating || 0} readOnly />
                                        </div>
                                        <div className="description">
                                            <p>{product?.description}</p>
                                        </div>
                                        <div className="button w-full flex flex-col md:flex-row  gap-4">
                                            <button onClick={() => {
                                                HandleDownLoadPdf(product.pdf)
                                            }} className='w-full block text-center py-3 text-2xl text-white bg-greenbg hover:bg-green-600'>تحميل الملف</button>
                                            <a href={product.pdf}   target="_blank" className='w-full block text-center py-3 text-2xl text-white bg-yellow-300 hover:bg-yellow-400'>قراءة</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Category />
                </div>
            </div>
            <Footer />
            <Dialog current={current}  dataDownloaded={dataDownloaded} Namepdf={Namepdf} HandleDownLoadPdf={HandleDownLoadPdf} />
        </>
    );
}

export default Page;

'use client'
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import React, { memo, useEffect, useState } from 'react';
import { db } from '../../../FirebaseConfig';

const Hero = () => {
    const [searchText, setSearchText] = useState('')
    const [productsSearch, setProductsSearch] = useState([]);
    const [Show, setShow] = useState('hidden');
    const [massellSearch, setMassellSearch] = useState('')
    const [products, setProducts] = useState([])

    // Handle Data Search
    useEffect(() => {
        if (searchText) {
            const Data = products?.filter((it) => it.title.toLowerCase().includes(searchText.toLowerCase()))
            setProductsSearch(Data)
        } else {
            setProductsSearch([])
            return setMassellSearch('لا يوجد بيانات');

        }
    }, [searchText])

    // fetch Data
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(docs);
        }
        fetchData();
    }, [])


    // Handle Show Data Search
    const HandleShowSearch = () => {
        if (Show === 'flex') {
            setShow('hidden')
        } else {
            setShow('flex')
        }
    }


    return (
        <>
            <div style={{ backgroundImage: 'url(/assets/images/1.svg)', backgroundPosition: 'center', backgroundSize: 'cover' }} className=" dark:bg-transparent bg-[#3aaf9e]">
                <div className="container mx-auto flex flex-col items-center py-12 sm:pt-24 w-full">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                        <h1 className="text-2xl xl:text-4xl text-center text-white dark:text-white font-bold leading-7 md:leading-10">
                            مكتبة نور
                        </h1>
                        <p className="sm:mt-5 lg:w-10/12 text-gray-200  font-normal text-center text-sm sm:text-3xl">
                            محرك بحث الكتب بالذكاء الإصطناعي
                        </p>
                    </div>
                    <div className="flex justify-center md:gap-2 items-center w-[95%] md:w-[90%] lg:w-[60%] relative h-16">
                        <input
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                            className="w-full outline-none border-none px-3 focus:outline-none h-full focus:ring-0  text-lg text-greenbg rounded-full"
                            placeholder='البحث عن اسم الكتاب'
                            type="search"
                            name="name"
                            id="name"
                        />
                        <button onClick={HandleShowSearch} className="absolute  left-0 border text-white text-xl border-white bg-greenbg w-[110px] md:w-[150px] h-full rounded-full">
                            بحث
                        </button>
                    </div>
                    <div className={`Show ${Show}  w-[95%] md:w-[90%] lg:w-[60%] flex-col gap-1 bg-white rounded-2xl mt-2 p-5 `} >
                        <svg
                            onClick={() => {
                                setShow('hidden');
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
                            viewBox="0 0 320.591 320.591"
                        >
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"
                            />
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"
                            />
                        </svg>
                        {productsSearch.length > 0 ? productsSearch.map((product) => (
                            <Link href={`/store/${product?.id}`} key={product.id} className=" flex gap-5 w-full hover:bg-gray-200 hover:text-white py-2 px-2 rounded-lg">
                                <h3 className="text-md text-gray-400">{product.title}</h3>
                            </Link>
                        )) :
                            <h3 className="text-md text-gray-400 text-center w-full">{massellSearch}</h3>
                        }
                    </div>
                    <div className="flex gap-5 mt-10 flex-wrap m-auto items-center justify-center">
                        <Link href="/books" className='border h-10 w-36 flex items-center justify-center rounded-xl text-white'>
                            أحدث الكتب
                        </Link>
                        <Link href="/authors" className='border h-10 w-36 flex items-center justify-center rounded-xl text-white'>
                            أشهر الكتب
                        </Link>
                        <Link href="/authors" className='border h-10 w-36 flex items-center justify-center rounded-xl text-white'>
                            الأشهر اليوم
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}

export default memo(Hero);

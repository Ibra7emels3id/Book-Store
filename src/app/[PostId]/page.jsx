'use client';
import React, { use, useEffect, useState } from 'react';
import Header from '../components/Header';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import Category from '../components/Category';
import Link from 'next/link';
import Image from 'next/image';
import { Rating } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import Loading from '../components/Loading';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const PageId = ({ params }) => {
    const decodedParams = use(params);
    const PostId = decodeURIComponent(decodedParams.PostId); 
    const productQuery = query(
        collection(db, "products"),
        where("category", "==", PostId)
    );
    const [products, loading, error] = useCollectionData(productQuery, { idField: 'id' });

    // Set loading
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div className='w-[95%] lg:w-[90%] m-auto mt-10 px-1'>
                <div className="flex w-full gap-5">
                    <div className="flex flex-col w-full lg:w-[83%]">
                        <div className="flex w-full justify-around items-center flex-wrap bg-white border py-3 rounded-xl">
                            <div className="flex flex-col items-start gap-4 justify-center">
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span>ما هو دور السياق الثقافي في الروايات والقصص الأدبية</span> </Link>
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span> من قصص الأدب؟</span> </Link>
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span> ما هي قصة رواية "القصر الأسود"؟</span> </Link>
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span> ما هي قصص الأدب الجاهلي؟</span> </Link>
                            </div>
                            <div className="flex flex-col items-start gap-4 justify-center">
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span>ما هي أنواع الروايات والقصص الأدبية؟</span> </Link>
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span> ما هي الفروق بين الروايات والقصص الأدبية؟</span> </Link>
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span> ما هي قصة "رواية ادم"؟</span> </Link>
                                <Link href={'/'} className='flex items-center gap-2 text-lg hover:text-green1'><HelpIcon /><span>ما هي بعض الروايات والقصص الأدبية الأكثر شعبية</span> </Link>
                            </div>
                        </div>
                        <div className="font-[sans-serif] py-4 mx-auto w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                {products?.map((it) => {
                                    return (
                                        <div key={it.id} className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 hover:border-greenbg border transition-all relative">
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
                                                <Link href={'/'} className="text-lg text-center mt-5 text-green1 font-bold">{it?.author}</Link>
                                            </div>
                                        </div>
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
};

export default PageId;

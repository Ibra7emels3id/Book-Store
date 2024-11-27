'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import DialogShowAddBook from './DialogShowAddBook';

const HeroImage = () => {
    const [showDialog, setShowDialog] = useState(false);
    // Add your image source here
    const imageSource = [
        {
            CountAuthor: '8,000,000 زائر شهرياً',
            src: '/assets/images/online-education.svg',
            alt: 'Image 1',
            text: 'تهدف مكتبة نور إلى إنشاء أكبر قاعدة بيانات لمؤلفين الكتب العربية عبر التاريخ',
        },
        {
            CountAuthor: '100,000 عملية بحث يومياً',
            src: '/assets/images/home_search.svg',
            alt: 'Image 2',
            text: 'تهدف مكتبة نور إلى إنشاء أكبر قاعدة بيانات لمؤلفين الكتب العربية عبر التاريخ',
        },
        {
            CountAuthor: '914,068 كتاب',
            src: '/assets/images/digital-library.svg',
            alt: 'Image 3',
            text: 'تهدف مكتبة نور إلى إنشاء أكبر قاعدة بيانات لمؤلفين الكتب العربية عبر التاريخ',
        },
        {
            CountAuthor: '299,228 مؤلف',
            src: '/assets/images/mobile-app.svg',
            alt: 'Image 4',
            text: 'تهدف مكتبة نور إلى إنشاء أكبر قاعدة بيانات لمؤلفين الكتب العربية عبر التاريخ',
        },
    ]

    // handle Show Dialog
    const HandleShowDialog = () => {
        if (showDialog === false) {
            setShowDialog(true);
        } else {
            setShowDialog(false);
        }
    }

    return (
        <>
            <ParallaxProvider>
                <div style={{ backgroundImage: 'url(/assets/images/Shiny_Overlay.svg)', backgroundPosition: 'center', backgroundSize: 'cover' }} className="flex  flex-col ">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10 md:py-16   w-[98%] xl:w-[85%] m-auto  ' >
                        {imageSource?.map((it) => {
                            return <div className='m-auto overflow-hidden flex flex-col items-center justify-center gap-2' speed={40} key={it.alt}>
                                <Image src={it.src} alt={it.alt} width={130} height={130} />
                                <h2 className="text-xl text-green1">{it.CountAuthor}</h2>
                                <p className="text-lg text-center text-zinc-600 ">{it.text}</p>
                            </div>
                        })}
                    </div>
                    <div className="flex items-center justify-around w-[98%] md:w-[50%] m-auto mb-10">
                        <Link href={'/store'} className='w-[150px] flex items-center justify-center bg-white  h-[70px] rounded-full text-green1 text-xl'>
                            شراء كتاب
                        </Link>
                        <button onClick={HandleShowDialog} className='w-[150px] flex items-center justify-center bg-white  h-[70px] rounded-full text-green1 text-xl'>
                            نشر كتاب
                        </button>
                    </div>
                </div>
            </ParallaxProvider>
            <DialogShowAddBook HandleShowDialog={HandleShowDialog} showDialog={showDialog}  />
        </>
    );
}

export default HeroImage;

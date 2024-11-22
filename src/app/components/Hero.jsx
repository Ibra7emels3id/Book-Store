import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <>
            <div style={{backgroundImage: 'url(/assets/images/1.svg)' , backgroundPosition:'center' , backgroundSize:'cover'}} className=" dark:bg-transparent bg-[#3aaf9e]">
                <div className="container mx-auto flex flex-col items-center py-12 sm:pt-24 w-full">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                        <h1 className="text-2xl xl:text-4xl text-center text-white dark:text-white font-bold leading-7 md:leading-10">
                            مكتبة نور
                        </h1>
                        <p className="sm:mt-5 lg:w-10/12 text-gray-200  font-normal text-center text-sm sm:text-3xl">
                            محرك بحث الكتب بالذكاء الإصطناعي
                        </p>
                    </div>
                    <div className="flex justify-center items-center w-[95%] md:w-[90%] lg:w-[60%] relative h-16">
                        <input
                            className="w-full outline-none border-none focus:outline-none h-full focus:ring-0  text-lg text-greenbg"
                            placeholder='البحث عن اسم الكتاب'
                            type="search"
                            name="name"
                            id="name"
                        />
                        <button className=" md:absolute relative md:left-0 border text-white text-xl  border-white bg-greenbg w-[150px] h-full">
                            بحث
                        </button>
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

export default Hero;

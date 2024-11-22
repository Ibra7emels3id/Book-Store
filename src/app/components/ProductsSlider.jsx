import Image from 'next/image';
import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay } from 'swiper/modules';

const ProductsSlider = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col justify-center items-center gap-3">
                    <h2 className=" font-bold text-6xl  md:text-7xl text-indigo-700">مكتبة سوف تريد</h2>
                    <p className='text-gray-500 text-center'>تصفح كتالوجنا العالمي الذي يضم الملايين من الكتب الأكثر مبيعًا والإصدارات الجديدة والكلاسيكية  <br />— مع الكتب المسموعة والكتب الإلكترونية الجديدة التي تتم إضافتها كل أسبوع.</p>
                </div>
                <div className="btn my-10 mx-3">
                    <ul className='flex items-center justify-around max-sm:flex-col md:w-[60%] rounded-xl md:rounded-full m-auto bg-gray-200 p-3'>
                        <li className='text-black w-full  hover:bg-black hover:text-white cursor-pointer m-auto flex items-center justify-center rounded-full h-14 font-semibold'>الكتب المسموعة الأكثر مبيعا</li>
                        <li className='text-black w-full  hover:bg-black hover:text-white cursor-pointer m-auto flex items-center justify-center rounded-full h-14 font-semibold'>كتب إلكترونية جديدة ومتجهة</li>
                        <li className='text-white bg-black  hover:bg-black hover:text-white cursor-pointer w-full m-auto flex items-center justify-center rounded-full h-14 font-semibold'>الكتب المسموعة المفضلة لدى المعجبين</li>
                    </ul>
                </div>
                <div className="slider my-10 px-5">
                    <Swiper
                        slidesPerView={7}
                        loop={true}
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                        }}
                        speed={2000}
                        spaceBetween={10}
                        freeMode={true}
                        // freeModeMomentum={false}
                        breakpoints={{
                            150: {
                                slidesPerView: 2,
                                spaceBetween: 5
                            },
                            540: {
                                slidesPerView: 3,
                            },
                            650: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            },
                            750: {
                                slidesPerView: 4,
                                spaceBetween: 15
                            },
                            850: {
                                slidesPerView: 5,
                                spaceBetween: 15
                            },
                            950: {
                                slidesPerView: 6,
                                spaceBetween: 15
                            },
                            1050: {
                                slidesPerView: 7,
                                spaceBetween: 15
                            },
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                                <p></p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="product-card">
                                <Image
                                    src="/assets/images/book_01.jpg"
                                    alt="Product 1"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                />
                                <h3 className="text-gray-700 text-sm font-semibold">Product 1</h3>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
                <div className="slider my-10 px-5">
                    <Swiper
                        slidesPerView={7}
                        loop={true}
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                        }}
                        speed={3000}
                        spaceBetween={10}
                        freeMode={true}
                        // freeModeMomentum={false}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {Array.from({ length: 10 }).map((_, index) => (
                            <SwiperSlide key={index} style={{ width: "200px" }}>
                                <div className="product-card">
                                    <Image
                                        src="/assets/images/book_01.jpg"
                                        alt={`Product ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="rounded-md"
                                    />
                                    <h3 className="text-gray-700 text-sm font-semibold">Product {index + 1}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default ProductsSlider;

import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <>
            <div className="w-[98%] md:w-[90%] m-auto mx-auto pt-16 ">
                <div className="w-11/12 xl:w-2/3 lg:w-2/3 md:w-2/3 mx-auto sm:mb-10 mb-16">
                    <h1 className=" xl:text-7xl md:text-3xl text-xl text-center text-indigo-700 font-bold mb-5 pt-4">شركائنا</h1>
                    <p className="text-base md:text-lg lg:text-xl text-center text-gray-400 font-normal xl:w-10/12 xl:mx-auto">تعمل "كتاب" على تعزيز تجربة القراءة الرقمية وتوفير بدائل تفاعلية تسهم في نشر المعرفة وتمكين المستخدمين من القراءة في أي وقت ومن أي مكان</p>
                </div>
                <div className="xl:py-16 lg:py-16 md:py-16 sm:py-16 px-15 flex flex-wrap">
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center  xl:pb-10 pb-16 items-center">
                        <Image src="https://cdn.tuk.dev/assets/adidas-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center  xl:pb-10 pb-16 items-center">
                        <Image src="https://cdn.tuk.dev/assets/channel-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center   xl:pb-10 pb-16 pt-4 items-center">
                        <Image src="https://cdn.tuk.dev/assets/nike-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center   xl:pb-10 pb-16 items-center">
                        <Image src="https://cdn.tuk.dev/assets/toyota-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center   xl:pt-10 items-center">
                        <Image src="https://cdn.tuk.dev/assets/gs1-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center   xl:pt-10 items-center">
                        <Image src="https://cdn.tuk.dev/assets/berry-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center xl:pt-10 lg:pt-10 md:pt-2 pt-16">
                        <Image src="https://cdn.tuk.dev/assets/min-dark.png" alt='image' width={150} height={150} />
                    </div>
                    <div className="w-6/12 xl:w-1/4 lg:w-1/4 md:w-1/4 flex justify-center   xl:pt-10 lg:pt-10 md:pt-2 pt-16">
                        <Image src="https://cdn.tuk.dev/assets/honda-dark.png" alt='image' width={150} height={150} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;

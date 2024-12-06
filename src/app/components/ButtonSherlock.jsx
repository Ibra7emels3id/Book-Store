import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonSherlock = () => {
    const router = useRouter()
    return (
        <>
            <div className="flex w-full justify-around items-center flex-wrap bg-white border h-[120px] rounded-xl">
                <div className="group">
                    <button onClick={() => {
                        router.push('/products/filtertoday')
                    }} className='flex flex-col items-center justify-center gap-3 group-hover:text-green1'>
                        <Image src={'/assets/images/new_books1.svg'} width={50} height={50} alt={"احدث الكتب"} />
                        <span className='text-xl text-center font-semibold'>الاشهر اليوم</span>
                    </button>
                </div>
                <div className="group">
                    <button onClick={() => {
                        router.push('/products/verified')
                    }} className='flex flex-col gap-3 items-center justify-center group-hover:text-green1'>
                        <Image src={'/assets/images/new_books1.svg'} width={50} height={50} alt={"احدث الكتب"} />
                        <span className='text-xl text-center font-semibold'> أشهر الكتب</span>
                    </button>
                </div>
                <div className="group">
                    <button onClick={() => {
                        router.push('/products/lastbooks')
                    }} className='flex flex-col gap-3 items-center justify-center group-hover:text-green1'>
                        <Image src={'/assets/images/new_books1.svg'} width={50} height={50} alt={"احدث الكتب"} />
                        <span className='text-xl text-center font-semibold'>أحدث الكتب</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ButtonSherlock;

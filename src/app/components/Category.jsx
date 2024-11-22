import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import Link from 'next/link';



const Category = () => {
    const [sortProduct, setSortProduct] = useState([]);

    // Get Data from Server 
    const GetData = async () => {
        const querySnapshot = await getDocs(collection(db, "category"));
        const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        docs.sort((a, b) => {
            const dateTimeA = new Date(`${a.date} ${a.time}`);
            const dateTimeB = new Date(`${b.date} ${b.time}`);
            return dateTimeB - dateTimeA;
        });
        setSortProduct(docs)
    }

    // Fetch Data when the component mounts
    useEffect(() => {
        GetData();
    }, []);


    return (
        <>
            <div className="category w-[22%] lg:flex hidden bg-white border py-5 px-1 gap-5 flex-col rounded-xl">
                <div className="flex items-center justify-between font-bold px-3">
                    <h3 className='text-2xl'>أقسام الكتب</h3>
                    <SearchIcon />
                </div>
                <ul className=' flex flex-col gap-2'>
                    {sortProduct.map((it) => (
                        <li key={it.id}>
                            <div className="group">
                                <Link href={`/${it.title}`} className='flex items-center justify-between w-full px-3 py-2 rounded-lg group-hover:underline hover:bg-[#f1f1f1] group-hover:text-green1 transition-all ease-in-out '>
                                    <span className='text-xl text-start'>{it.title?.slice(0 , 25)}.</span>
                                    <Image src={'/assets/images/new_books1.svg'} width={20} height={20} alt={"ا��دث الكتب"} />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Category;

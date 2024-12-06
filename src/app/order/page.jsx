'use client'
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import Image from 'next/image';

const Page = () => {
    const [data, setData] = useState([])
    const [StateDetailsId, setStateDetailsId] = useState(null);


    // Get Data from Server 
    const GetData = async () => {
        const querySnapshot = await getDocs(collection(db, "order"));
        const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setData(docs)
    }
    useEffect(() => {
        GetData()
    }, []);

    console.log(data);

    // Handle Show Alert
    const HandleShowALert = (id) => {
        if (StateDetailsId === id) {
            setStateDetailsId(null);
        } else {
            setStateDetailsId(id);
        }
    }


    return (
        <>
            <Header />
            <div className=" w-[98%] md:w-[80%] m-auto">
                <h1 className=' text-green-700 font-bold mt-10 text-5xl'>جميع المعاملات</h1>
                <div className="flex flex-col mt-7">
                    {data.map((it) => {
                        return (
                            <div key={it.id} className="flex flex-col items-center justify-between bg-white rounded-xl p-4 ">
                                <div className="flex w-full justify-between items-center">
                                    <div className="">
                                        <h2 className='text-2xl text-green-600 font-semibold '>{it.title}</h2>
                                    </div>
                                    <div className="flex-col">
                                        <p className="text-gray-600">Id: {it.id}</p>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <p className={`${it.status === 'أنتظار' ? 'bg-red-500' : 'bg-teal-600'} w-[120px] m-auto py-2 text-center rounded-xl text-xl font-semibold text-white`}>{it.status}</p>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <button onClick={() => {
                                            // handle view details
                                            HandleShowALert(it.id)
                                        }} className={`${!StateDetailsId ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} py-3 w-[120px] m-auto text-white rounded-2xl`}>{!StateDetailsId ? 'التفاصيل' : 'الغاء'}</button>
                                    </div>
                                </div>
                                <div className={`${StateDetailsId === it.id ? 'flex' : 'hidden'} justify-between w-full items-center mt-10 border-t-2 p-4 `}>
                                    <div className="img">
                                        <Image width={100} height={100} src={it.image} alt='image' />
                                    </div>
                                    <div className="flex-col ml-4">
                                        <h2 className='text-xl text-green-600 font-semibold'>{it.title}</h2>
                                        <p>{it.email}</p>
                                    </div>
                                    <div className="text">
                                        <p className="text-gray-600">{it.description.slice(0, 50)}...</p>
                                    </div>
                                    <div className="flex text-xl ">
                                        {it.language}
                                    </div>
                                    <div className="flex text-center">
                                        {it.date}
                                        <br />
                                        {it.time}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Page;

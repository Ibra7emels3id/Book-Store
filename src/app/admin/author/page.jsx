'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Loading from '@/app/components/Loading';
import Header from '../components/Header';
import { db } from '../../../../FirebaseConfig';
import DialogDelauthor from './_components/DialogDelauthor';


const Page = () => {
    const [open, setOpen] = useState('hidden')
    const router = useRouter()
    const [Products, setSortProduct] = useState([])
    const [currentId, setCurrentId] = useState(null)
    const [loading, setLoading] = useState(true)


    // Handle Alert diloge
    const handleClose = (id) => {
        if (open === 'flex') {
            setOpen('hidden')
        } else {
            setOpen('flex')
            setCurrentId(id)
        }
        setCurrentId(id)
    }

    // Get Data from Server 
    const GetData = async () => {
        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "author"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setSortProduct(docs)
        } catch (error) {
            console.error("Error getting documents: ", error);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    // use Effect 
    React.useEffect(() => {
        GetData()
    }, [])


    // set Loading
    if (loading) {
        return <Loading />
    }


    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto mr-[50px] md:mr-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <h1 className="text-4xl font-bold text-center mb-4">جميع المؤلفين</h1>
                        <div className="btn flex flex-wrap justify-around my-3 gap-3">
                            <button onClick={() => {
                                router.push('/admin/author/addAuthor')
                            }} className=' bg-yellow w-full h-10 bg-greenbg hover:bg-green1 border text-white text-lg bg-green2'>أضافه مؤلف جديد</button>
                        </div>
                        {Products.length > 0 ? <div className="overflow-x-auto font-[sans-serif]">
                            <table className="min-w-[1170px] bg-white ">
                                <thead className="bg-gray-700 whitespace-nowrap">
                                    <tr>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            الاسم
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            التاريخ
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            حذف
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="whitespace-nowrap">
                                    {Products.map((it) => {
                                        return (
                                            <tr key={it.id} className="even:bg-blue-50">
                                                <td className="p-4 text-sm text-center">
                                                    {it?.title}
                                                </td>
                                                <td className="p-4 text-sm text-center">
                                                    {it?.date}<br/>
                                                    {it.time}
                                                </td>
                                                <td className="p-4 h-full mt-4 text-center" >
                                                    <button  onClick={async () => {
                                                        handleClose(it.id)
                                                    }} type='submit' className="text-center" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                            <path
                                                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                                data-original="#000000" />
                                                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                                data-original="#000000" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div> : <div className='flex flex-col my-10'>
                            <h3 className="text-center text-3xl font-bold text-green1">لا يوجد منتجات</h3>
                        </div>}
                    </div>
                </div>
            </div>
            <DialogDelauthor open={open} handleClose={handleClose} currentId={currentId} GetData={GetData} />
        </>
    );
}

export default Page;

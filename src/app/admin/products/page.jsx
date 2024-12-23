'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import DialogDelProduct from './_components/DialogDelProduct';
import Loading from '@/app/components/Loading';
import { db } from '../../../../FirebaseConfig';
import Header from '../components/Header';


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
            const querySnapshot = await getDocs(collection(db, "products"));
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
                        <h1 className="text-2xl font-bold text-center mb-4">All Products</h1>
                        <div className="btn flex flex-wrap justify-around my-3 gap-3">
                            <button onClick={() => {
                                router.push('/admin/products/addproduct')
                            }} className=' bg-yellow w-full h-10 bg-greenbg hover:bg-green1 border text-white text-lg bg-green2'>أضافه منتج جديد</button>
                        </div>
                        {Products.length > 0 ? <div className="overflow-x-auto font-[sans-serif]">
                            <table className="min-w-[1170px] bg-white ">
                                <thead className="bg-gray-700 whitespace-nowrap">
                                    <tr>
                                        <th className="pr-4 w-[100px] text-white">
                                            الصوره
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            العنوان
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            التفاصيل
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            التاريخ
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            تعديل
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            حذف
                                        </th>
                                        <th className="p-4 text-center text-sm font-medium text-white">
                                            تحميل
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="whitespace-nowrap">
                                    {Products.map((it) => {
                                        return (
                                            <tr key={it.id} className="even:bg-blue-50">
                                                <td className="pr-4 w-20 py-3">
                                                    <Image
                                                        src={it?.image}
                                                        alt="Product Image"
                                                        className="w-20 h-20 rounded-full"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </td>
                                                <td className="p-4 text-sm text-center">
                                                    {it?.title}
                                                </td>
                                                <td className="p-4 text-sm text-center">
                                                    {it?.description?.slice(0, 40)}...
                                                </td>
                                                <td className="p-4 text-sm text-center">
                                                    {it?.date}
                                                </td>
                                                <td className="p-4 h-full block">
                                                    <Link href={`/admin/products/Edit/${it.id}`} className="mr-4" title="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                                                            viewBox="0 0 348.882 348.882">
                                                            <path
                                                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                                data-original="#000000" />
                                                            <path
                                                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                                data-original="#000000" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                                <td className="p-4 h-full mt-4">
                                                    <button onClick={async () => {
                                                        handleClose(it.id)
                                                    }} type='submit' className="mr-4" title="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                            <path
                                                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                                data-original="#000000" />
                                                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                                data-original="#000000" />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="p-4 h-full mt-4 text-center">
                                                    <a href={it?.pdf} download className='bg-green1 text-white cursor-pointer w-[100px] m-auto h-10 flex items-center justify-center'>
                                                        تحميل ملف
                                                    </a>
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
            <DialogDelProduct open={open} handleClose={handleClose} currentId={currentId} GetData={GetData} />
        </>
    );
}

export default Page;

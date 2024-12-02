'use client'
import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { database } from '../../../../../FirebaseConfig';
import Image from 'next/image';


const FormDataUser = () => {
    const [products, setProducts] = React.useState([]);


    // Fetch Data from FireBase
    const fetchAllUsers = async () => {
        const dbRef = ref(database);
        try {
            const snapshot = await get(child(dbRef, `users`));
            if (snapshot.exists()) {
                const dataObject = snapshot.val();
                const dataArray = Object.entries(dataObject).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setProducts(dataArray);
                console.log(dataArray);
            } else {
                console.log("No data available");
                return [];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    // Fetch Data
    useEffect(() => {
        fetchAllUsers()
    }, []);



    return (
        <>
            {products?.length > 0 ? <div className="overflow-x-auto font-[sans-serif]">
                <table className="min-w-[1170px] w-full bg-white ">
                    <thead className="bg-gray-700 whitespace-nowrap">
                        <tr>
                            <th className="pr-4 text-center m-auto w-[100px] text-white">
                                الصوره
                            </th>
                            <th className="p-4 text-center text-sm font-bold text-white">
                                الاسم
                            </th>
                            <th className="p-4 text-center text-sm font-bold text-white">
                                الايميل
                            </th>
                            <th className="p-4 text-center text-sm font-bold text-white">
                                Role
                            </th>
                            <th className="p-4 w-[120px] m-auto text-center text-md font-bold text-white">
                                التاريخ
                            </th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {products?.map((it) => {
                            return (
                                <tr key={it.id} className="even:bg-blue-50 px-5">
                                    <td className="pr-4 w-20 py-3">
                                        <Image
                                            src={it?.image || 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg='}
                                            alt="Product Image"
                                            className="w-20 h-20 rounded-full"
                                            width={100}
                                            height={100}
                                        />
                                    </td>
                                    <td className="p-4 text-sm text-center">
                                        {it?.username}
                                    </td>
                                    <td className="p-4 text-sm text-center">
                                        {it?.email}
                                    </td>
                                    <td className="p-4 text-sm text-center">
                                        {it?.role}
                                    </td>
                                    <td className="p-4 text-sm text-center">
                                        {it?.date} <br />
                                        {it.time}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> : <div className='flex flex-col my-10'>
                <h3 className="text-center text-3xl font-bold text-green1">لا يوجد منتجات</h3>
            </div>}
        </>
    );
}

export default FormDataUser;

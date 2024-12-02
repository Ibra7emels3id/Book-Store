'use client'
import { useRouter } from "next/navigation";
import { db } from "../../../../../FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import Header from "../../components/Header";


const Page = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({})


    // handle Change event
    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    // Handle Submit Data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const categoriesRef = collection(db, 'author');
            const q = query(categoriesRef, where('title', '==', product.title));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(categoriesRef, {
                    title: product.title,
                    date: new Date().toDateString(),
                    time: new Date().toLocaleTimeString()
                });
                toast.success('تم اضافة المؤلف بنجاح')
                router.push('/admin/author');
            } else {
                toast.error('Category already exists!');
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    if (loading) {

    }

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full mr-[50px] md:mr-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">أضافه مؤلف جديد</h2>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border' type="text" name="title" id="title" placeholder='أدخل الاسم' />
                            {loading ? <p type='submit' className='flex items-center justify-center w-full h-12 px-6 text-white text-base font-semibold bg-yellow  rounded-md mt-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 animate-spin fill-green1 block mx-auto"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                        data-original="#000000" />
                                </svg>
                            </p> : <button type='submit' className='w-full h-12 px-6 text-white text-2xl font-semibold bg-green1 hover:bg-green2 rounded-md mt-8'>أضافة</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

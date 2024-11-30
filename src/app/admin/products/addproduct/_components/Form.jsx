'use client'
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db, storage } from '../../../../../../FirebaseConfig';
import { toast } from 'react-toastify';

const Form = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(false);
    const [product, setProduct] = useState({})


    // handle Change event
    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    // Handle Submit Data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.title && !product.author && !product.image && !product.rating && !product.language && !product.category && !pdfUrl && !imageUrl && !product.imageUrl) {
            return toast.error('أدخل جميع البيانات رجاء', {
                position: 'bottom-left',
                autoClose: 2000,
            })
        }
        setLoading(true);
        try {
            const fileRefBlog = ref(storage, `filesBlog/${imageUrl.name}/${new Date().toISOString()}`);
            const snapshotBlog = await uploadBytes(fileRefBlog, imageUrl);
            const url = await getDownloadURL(fileRefBlog);

            const fileRefPdfBlog = ref(storage, `filesBlog/${pdfUrl.name}/${new Date().toISOString()}`);
            const snapshotPdfBlog = await uploadBytes(fileRefPdfBlog, pdfUrl);
            const PdfUrl = await getDownloadURL(fileRefPdfBlog);


            const docRef = await addDoc(collection(db, "/products"), {
                ...product,
                image: url,
                pdf: PdfUrl,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });
            console.log("Document written with ID: ", docRef.id);
            router.push('/admin/products');
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='w-full'>
                <input onChange={handleInputChange} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full outline-none focus:outline-none border' type="text" name="title" id="title" placeholder='أدخل العنوان' />
                <input onChange={handleInputChange} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="count" id="count" placeholder='أدخل عدد المنتج' />
                <input onChange={handleInputChange} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="namePages" id="namePages" placeholder='أدخل عدد الصفحات الخاصه بالمنتج' />
                <input onChange={handleInputChange} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full mt-4 outline-none focus:outline-none border' type="text" name="typeFile" id="typeFile" placeholder='نوع الملف' />
                <Rating style={{ direction: 'ltr' }} onChange={handleInputChange} className='mt-5 px-2 ' name='rating' value={product?.rating || 0} size="large" />
                <select onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                }} className='h-12 px-3 w-full mt-4 focus:ring-0 focus:border-green-500 outline-none focus:outline-none border' name="category" id="category">
                    <option value="عمران عبد الكريم منصور" >أقسام الكتب</option>
                    <option value="عمران عبد الكريم منصور" >عمران عبد الكريم منصور</option>
                    {/* {category?.map((it) => {
                                    return (
                                        <option key={it._id} value={it.category}>{it.category}</option>
                                    )
                                })} */}
                </select>
                <select onChange={(e) => {
                    setProduct({ ...product, author: e.target.value });
                }} className='h-12 px-3 w-full mt-4 focus:ring-0 focus:border-green-500 outline-none focus:outline-none border' name="category" id="category">
                    <option value="عمران عبد الكريم منصور" >ألمؤلف</option>
                    <option value="عمران عبد الكريم منصور" >عمران عبد الكريم منصور</option>
                    {/* {category?.map((it) => {
                                    return (
                                        <option key={it._id} value={it.category}>{it.category}</option>
                                    )
                                })} */}
                </select>
                <select onChange={(e) => {
                    setProduct({ ...product, language: e.target.value });
                }} className='h-12 px-3 focus:ring-0 focus:border-green-500 w-full mt-4 outline-none focus:outline-none border' name="category" id="category">
                    <option value="عمران عبد الكريم منصور" >أختر اللغه</option>
                    <option value="عمران عبد الكريم منصور" >اللغه العرابيه</option>
                    <option value="عمران عبد الكريم منصور" >اللغه الانجليزيه</option>
                </select>
                <label
                    htmlFor="uploadFile1"
                    className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 ml-2 fill-white inline"
                        viewBox="0 0 32 32"
                    >
                        <path
                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                            data-original="#000000"
                        />
                        <path
                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                            data-original="#000000"
                        />
                    </svg>
                    تحميل صوره المنتج
                    <input
                        onChange={(e) => setImageUrl(e.target.files[0])}
                        type="file"
                        id="uploadImage"
                        hidden
                    />
                </label>
                <label
                    htmlFor="uploadFile1"
                    className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 ml-2 fill-white inline"
                        viewBox="0 0 32 32"
                    >
                        <path
                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                            data-original="#000000"
                        />
                        <path
                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                            data-original="#000000"
                        />
                    </svg>
                    تحميل الكتاب pdf
                    <input
                        onChange={(e) => setPdfUrl(e.target.files[0])}
                        type="file"
                        id="uploadPdf"
                        hidden
                    />
                </label>
                <div className="image flex items-center justify-center">
                    {imageUrl && <Image width={100} height={100} className='mt-4 w-52 ' src={URL.createObjectURL(imageUrl)} alt="Uploaded Image" />}
                </div>
                <textarea onChange={handleInputChange} className='h-32 px-3 focus:ring-0 focus:border-green-500 py-2 w-full mt-4 outline-none focus:outline-none border' name="description" id="description" placeholder='أدخل التفاصيل الخاصه بالمنتج' />
                {loading ? <p type='submit' className='flex items-center justify-center w-full h-12 px-6 text-white text-base font-semibold bg-yellow  rounded-md mt-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 animate-spin fill-green1 block mx-auto"
                        viewBox="0 0 24 24">
                        <path
                            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                            data-original="#000000" />
                    </svg>
                </p> : <button type='submit' className='w-full h-12 px-6 text-white text-base font-semibold bg-green1 hover:bg-green2 rounded-md mt-8'>أضافه المنتج </button>}
            </form>
        </>
    );
}

export default Form;

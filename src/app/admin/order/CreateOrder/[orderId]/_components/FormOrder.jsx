'use client'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Button, Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { db } from '../../../../../../../FirebaseConfig';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FormOrder = ({ Id }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(false);
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState([])
    const [author, setAuthor] = useState([])


    console.log(product);

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

            let image = product.image
            let pdf = product.pdf

            // upload image to firebase storage
            if (imageUrl) {
                const fileRefBlog = ref(storage, `filesBlog/${imageUrl.name}/${new Date().toISOString()}`);
                const snapshotBlog = await uploadBytes(fileRefBlog, imageUrl);
                const url = await getDownloadURL(fileRefBlog);
                image = url
            }

            if (pdfUrl) {
                const fileRefPdfBlog = ref(storage, `filesBlog/${pdfUrl.name}/${new Date().toISOString()}`);
                const snapshotPdfBlog = await uploadBytes(fileRefPdfBlog, pdfUrl);
                const PdfUrl = await getDownloadURL(fileRefPdfBlog);
                pdf = PdfUrl
            }

            // update data to firestore
            const bookStore = await addDoc(collection(db, 'products'), {
                ...product,
                image: image,
                pdf: pdf,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });

            console.log("Document written with ID: ", bookStore.id);
            toast.success('تم الاضافة بنجاح', {
                position: 'bottom-left',
                autoClose: 2000,
            })
            await deleteDoc(doc(db, "order", Id));
            router.push('/admin/products');
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        // Fetch the product
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "order", Id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct(data);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }

        // Fetch the Category
        const GetDataCategory = async () => {
            try {
                setLoading(true)
                const querySnapshot = await getDocs(collection(db, "category"));
                const docs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategory(docs)
            } catch (error) {
                console.error("Error getting documents: ", error);
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        // Fetch the author
        const GetDataAuthor = async () => {
            try {
                setLoading(true)
                const querySnapshot = await getDocs(collection(db, "author"));
                const docs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAuthor(docs)
            } catch (error) {
                console.error("Error getting documents: ", error);
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        GetDataAuthor()
        GetDataCategory()
        fetchProduct();
    }, [Id])





    return (
        <>
            <form onSubmit={handleSubmit} className='w-full'>
                <input onChange={handleInputChange} value={product?.title} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full outline-none focus:outline-none border' type="text" name="title" id="title" placeholder='أدخل العنوان' />
                <input onChange={handleInputChange} value={product?.count} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="count" id="count" placeholder='أدخل عدد المنتج' />
                <input onChange={handleInputChange} value={product?.namePages} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="namePages" id="namePages" placeholder='أدخل عدد الصفحات الخاصه بالمنتج' />
                <input onChange={handleInputChange} value={product?.typeFile} className='h-12 focus:ring-0 focus:border-green-500 px-3 w-full mt-4 outline-none focus:outline-none border' type="text" name="typeFile" id="typeFile" placeholder='نوع الملف' />
                <Rating style={{ direction: 'ltr' }} onChange={handleInputChange} className='mt-5 px-2 z-10' name='rating' value={product?.rating || 0} size="large" />
                <select onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                }} value={product.category} className='h-12 px-3 w-full mt-4 focus:ring-0 focus:border-green-500 outline-none focus:outline-none border' name="category" id="category">
                    <option value="عمران عبد الكريم منصور" >أقسام الكتب</option>
                    <option value="عمران عبد الكريم منصور" >عمران عبد الكريم منصور</option>
                    {category?.map((it) => {
                        return (
                            <option key={it._id} value={it.title}>{it.title}</option>
                        )
                    })}
                </select>
                {product?.category && <p>{product?.category}</p>}
                <select onChange={(e) => {
                    setProduct({ ...product, author: e.target.value });
                }} value={product.author} className='h-12 px-3 w-full mt-4 focus:ring-0 focus:border-green-500 outline-none focus:outline-none border' name="category" id="category">
                    <option value="عمران عبد الكريم منصور" >ألمؤلف</option>
                    <option value="عمران عبد الكريم منصور" >عمران عبد الكريم منصور</option>
                    {author?.map((it) => {
                        return (
                            <option key={it._id} value={it.title}>{it.title}</option>
                        )
                    })}
                </select>
                {product?.author && <p>{product?.author}</p>}
                <select onChange={(e) => {
                    setProduct({ ...product, language: e.target.value });
                }} value={product.language} className='h-12 px-3 focus:ring-0 focus:border-green-500 w-full mt-4 outline-none focus:outline-none border' name="category" id="category">
                    <option hidden >أختر اللغه</option>
                    <option value="اللغه العرابيه" >اللغه العرابيه</option>
                    <option value="اللغه الانجليزيه" >اللغه الانجليزيه</option>
                </select>
                {product?.language && <p>{product?.language}</p>}

                <Button
                    sx={{ display: 'flex', gap: '15px', marginTop: '15px', backgroundColor: '#0e9f6e' }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    تحميل الصوره
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                        multiple
                    />
                </Button>
                <Button
                    sx={{ display: 'flex', gap: '15px', marginTop: '15px', backgroundColor: '#0e9f6e' }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    تحميل ملف الكتاب
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(e) =>
                            setPdfUrl(e.target.files[0])
                        }
                        multiple
                    />
                </Button>
                <div className="image flex items-center justify-center">
                    {imageUrl ? <Image width={100} height={100} className='mt-4 w-52 ' src={URL.createObjectURL(imageUrl)} alt="Uploaded Image" /> : <Image width={100} height={100} className='mt-4 w-52 ' src={product.image} alt="Uploaded Image" />}
                </div>
                <textarea value={product.description} onChange={handleInputChange} className='h-32 px-3 focus:ring-0 focus:border-green-500 py-2 w-full mt-4 outline-none focus:outline-none border' name="description" id="description" placeholder='أدخل التفاصيل الخاصه بالمنتج' />
                {loading ? <p type='submit' className='flex items-center justify-center w-full h-12 px-6 text-white text-base font-semibold bg-yellow  rounded-md mt-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 animate-spin fill-green1 block mx-auto"
                        viewBox="0 0 24 24">
                        <path
                            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                            data-original="#000000" />
                    </svg>
                </p> : <button type='submit' className='w-full h-12 px-6 text-white text-base font-semibold bg-green1 hover:bg-green2 rounded-md mt-8'>أضافة الي القائمة</button>}
            </form>
        </>
    );
}

export default FormOrder;

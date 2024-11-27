import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../../FirebaseConfig';
import { Button, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';

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



const DialogShowAddBook = ({ showDialog, HandleShowDialog }) => {
    const [formData, setFormData] = useState({})
    const [sortProduct, setSortProduct] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenownership, setIsOpenownership] = useState(false);

    const dropdownMenuRef = useRef(null);



    // Handle Change events
    const handleChangeEvent = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handel Submit Data Book Store
    const handleSubmitDataBookStore = (e) => {
        e.preventDefault()
    }

    // Handle Toggle
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Handle Toggle ownership
    const toggleDropdownownership = () => {
        setIsOpenownership((prev) => !prev);
    };






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

    // use Effect 
    useEffect(() => {
        GetData()
    }, [])


    return (
        <>
            <div className={`${showDialog === false ? " hidden" : "fixed"} inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-md p-8 relative">
                    <svg
                        onClick={() => {
                            HandleShowDialog()
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 cursor-pointer shrink-0 fill-gray-800 hover:fill-red-500 float-right"
                        viewBox="0 0 320.591 320.591"
                    >
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"
                        />
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"
                        />
                    </svg>
                    <div className="my-8 text-center">
                        <h4 className="text-3xl text-gray-800 font-bold">
                            أضافه الكتاب الخاص بك
                        </h4>
                        <p className="text-sm text-gray-500 mt-2">
                            ملكية عامه مجاني ولاكن ملكيه خاصه يتم دفع بعض الرسوم المالية
                        </p>
                        <input
                            onChange={handleChangeEvent}
                            value={formData.title}
                            name='title'
                            type="text"
                            placeholder="أدخل أسم الكتاب"
                            className='h-12 px-3 w-full mt-4 focus:ring-0 outline-none focus:outline-none focus:border-green-500 border'
                        />
                        <input
                            onChange={handleChangeEvent}
                            value={formData.numberPages}
                            name='numberPages'
                            type="number"
                            placeholder="أدخل عدد صفحات الكتاب"
                            className='h-12 px-3 w-full mt-4 focus:ring-0 outline-none focus:outline-none focus:border-green-500 border'
                        />
                        <input
                            onChange={handleChangeEvent}
                            value={formData.typeFile}
                            name='typeFile'
                            type="text"
                            placeholder="أدخل نوع الملف"
                            className='h-12 px-3 w-full mt-4 focus:ring-0 outline-none focus:outline-none focus:border-green-500 border'
                        />
                        <input
                            onChange={handleChangeEvent}
                            value={formData.language}
                            name='language'
                            type="text"
                            placeholder="أدخل لغه الكتاب"
                            className='h-12 px-3 w-full mt-4 focus:ring-0 outline-none focus:outline-none focus:border-green-500 border'
                        />
                        <input
                            onChange={handleChangeEvent}
                            value={formData.author}
                            name='author'
                            type="text"
                            placeholder="أدخل أسم المؤلف"
                            className='h-12 px-3 mt-5 w-full focus:ring-0 outline-none focus:outline-none focus:border-green-500 border'
                        />
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{ bgcolor: 'green', marginTop: '20px' }}
                            startIcon={<CloudUploadIcon sx={{ marginLeft: '10px' }} />}
                            className="px-5 mt-5 py-2.5 rounded text-white text-md w-full font-semibold tracking-wide border-none outline-none bg-green-400 hover:bg-green-500 active:bg-green-600"
                        >
                            أرفع صوره الكتاب
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => {
                                    setFormData({ ...formData, image: event.target.files[0] })
                                }}
                                multiple
                            />
                        </Button>
                        {formData.image && <div className='flex w-full items-center justify-center mt-5'>
                            <Image width={100} height={100} src={URL.createObjectURL(formData.image)} alt='image' />
                        </div>}
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            sx={{ bgcolor: 'green', marginTop: '20px' }}
                            startIcon={<CloudUploadIcon sx={{ marginLeft: '10px' }} />}
                            className="px-5 mt-5 py-2.5 rounded text-white text-md w-full font-semibold tracking-wide border-none outline-none bg-green-400 hover:bg-green-500 active:bg-green-600"
                        >
                            أرفع ملف الكتاب
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => {
                                    setFormData({ ...formData, pdf: event.target.files[0] })
                                }}
                                multiple
                            />
                        </Button>
                        <div className="relative font-[sans-serif] w-full">
                            <button
                                type="button"
                                onClick={toggleDropdownownership}
                                className="px-5 py-2.5 rounded text-white text-md w-full mt-5 font-semibold tracking-wide border-none outline-none bg-green-400 hover:bg-green-500 active:bg-green-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-white inline ml-3" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                أختار ألملكيه
                            </button>
                            {/* Dropdown Menu */}
                            <ul
                                ref={dropdownMenuRef}
                                className={`absolute right-0 shadow-lg bg-white py-2 px-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto transition-all ${isOpenownership ? 'block' : 'hidden'
                                    }`}
                            >
                                <li onClick={() => {
                                    setFormData({ ...formData, ownership: 'ملكية عامة' })
                                    setIsOpenownership((prev) => !prev);
                                }} className="py-2.5 px-4 text-start hover:bg-blue-50 text-black text-sm cursor-pointer rounded " >
                                    ملكية عامة
                                </li>
                                <li onClick={() => {
                                    setFormData({ ...formData, ownership: 'ملكية خاصة' })
                                    setIsOpenownership((prev) => !prev);
                                }} className="py-2.5 px-4 text-start hover:bg-blue-50 text-black text-sm cursor-pointer rounded " >
                                    ملكية خاصة
                                </li>
                            </ul>
                        </div>
                        {formData.ownership && (
                            <p className="my-5 text-lg text-gray-600">
                                النتيجة: <span className="font-bold">{formData.ownership}</span>
                            </p>
                        )}
                        <div className="relative font-[sans-serif] w-full">
                            <button
                                type="button"
                                onClick={toggleDropdown}
                                className="px-5 py-2.5 rounded text-white text-md w-full mt-5 font-semibold tracking-wide border-none outline-none bg-green-400 hover:bg-green-500 active:bg-green-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-white inline ml-3" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                أختار قسم لكتابك
                            </button>
                            {/* Dropdown Menu */}
                            <ul
                                ref={dropdownMenuRef}
                                className={`absolute right-0 shadow-lg bg-white py-2 px-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto transition-all ${isOpen ? 'block' : 'hidden'
                                    }`}
                            >
                                <li className="mb-2">
                                    <input
                                        onChange={(e) => {
                                            setSearchText(e.target.value)
                                        }}
                                        type='text'
                                        placeholder="أدخل أسم القسم"
                                        className="px-4 py-2.5 w-full rounded text-gray-800 text-sm focus:border-gray-500 outline-none focus:ring-0 border focus:bg-transparent"
                                    />
                                </li>
                                {sortProduct.filter((it) => it.title.toLowerCase().includes(searchText)).map((it) => {
                                    return (
                                        <li onClick={() => {
                                            setFormData({ ...formData, category: it.title })
                                            setIsOpen((prev) => !prev);
                                        }} className="py-2.5 px-4 text-start hover:bg-blue-50 text-black text-sm cursor-pointer rounded " key={it.id} >
                                            {it.title}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        {formData.category && (
                            <p className="my-5 text-lg text-gray-600">
                                النتيجة: <span className="font-bold">{formData.category}</span>
                            </p>
                        )}
                        <textarea onChange={handleChangeEvent} className='h-32 px-3 py-2 w-full mt-4 outline-none focus:outline-none focus:border-green-500 border focus:ring-0' name="description" id="description" placeholder='أدخل التفاصيل الخاصه بالمنتج' />
                    </div>
                    <button
                        onClick={handleSubmitDataBookStore}
                        type="submit"
                        className="px-5 py-2.5 w-full rounded-md text-white text-md outline-none bg-green-500 hover:bg-green-600"
                    >
                        أرسال البيانات
                    </button>
                </div>
            </div>

        </>
    );
}

export default DialogShowAddBook;

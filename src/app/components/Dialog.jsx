import { Modal, } from 'flowbite-react';
import React, { useState } from 'react';
import { auth } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';


const Dialog = ({ openModal, setOpenModal }) => {
    const [OpenResolt, setOpenResolt] = useState('login')
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({})


    // Hndle Submit Register
    const handleRegister = async () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: formData.name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {
                    return toast.success('تم تسجيل حسابك بنجاح')
                })
                const user = userCredential.user;
                // Signed up 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }



    // Handle Submit Login
    const handleLogin = async () => {
        !formData.email && setError({ ...error, email: 'ادخل الايميل رجاء ' })
        !formData.password && setError({ ...error, password: 'ادخل الباسورد رجاء ' })

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setOpenModal(false);
                return toast.success('تم تسجيل الدخول')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setTimeout(() => {
                    setError({
                        email: '', password: '', name: ''
                    })
                }, 3000);
            });
    }





    return (
        <>
            <Modal
                className=''
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header className='text-start hover:text-green1 border-none'></Modal.Header>
                {/* register */}
                <Modal.Body className={`${OpenResolt == 'login' ? 'hidden' : 'flex flex-col'}`}>
                    <div className="space-y-6 p-6">
                        <input onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                        }} className='w-full outline-none  focus:outline-none focus:border-green1 focus:ring-0 border' type="text" name="name" id="name" placeholder='ادخل الاسم الخاص بك' />
                    </div>
                    <div className="space-y-6 p-6">
                        <input onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} className='w-full outline-none  focus:outline-none focus:border-green1 focus:ring-0 border' type="email" name="email" id="email" placeholder='ادخل الايميل الخاص بك' />
                    </div>
                    <div className="space-y-6 p-6">
                        <input onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} className='w-full outline-none  focus:outline-none focus:border-green1 focus:ring-0 border' type="password" name="password" id="password" placeholder='ادخل باسورد الخاص بك' />
                    </div>
                    <div className="flex items-center justify-around my-4 w-[90%] m-auto gap-5">
                        <button className='text-green1 border border-greenbg w-full py-2 text-xl ' onClick={async () => {
                            await handleRegister();
                            setOpenModal(false);
                        }}>تسجيل</button>
                        <button className='text-green1 border border-greenbg w-full py-2 text-xl ' color="gray" onClick={() => setOpenModal(false)}>
                            الغاء
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <button onClick={() => {
                            setOpenResolt('login');
                        }} className=' underline hover:text-green1' href={'/login'}>تسجيل الدخول</button>
                    </div>
                </Modal.Body>

                {/* login */}
                <Modal.Body className={`${OpenResolt == 'register' ? 'hidden' : 'flex flex-col'}`}>
                    <div className="space-y-6 p-6">
                        <input onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} className='w-full outline-none  focus:outline-none focus:border-green1 focus:ring-0 border' type="email" name="email" id="email" placeholder='ادخل الايميل الخاص بك' />
                        {error.email && <p className='text-red-500'>{error.email}</p>}
                    </div>
                    <div className="space-y-6 p-6">
                        <input onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} className='w-full outline-none  focus:outline-none focus:border-green1 focus:ring-0 border' type="password" name="password" id="password" placeholder='ادخل باسورد الخاص بك' />
                        {error.password && <p className='text-red-500'>{error.password}</p>}
                    </div>
                    <div className="flex items-center justify-around my-4 w-[90%] m-auto gap-5">
                        <button className='text-green1 border border-greenbg w-full py-2 text-xl ' onClick={async () => {
                            await handleLogin();
                        }}>تسجيل الدخول</button>
                        <button className='text-green1 border border-greenbg w-full py-2 text-xl ' color="gray" onClick={() => setOpenModal(false)}>
                            الغاء
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <button onClick={() => {
                            setOpenResolt('register');
                        }} className=' underline hover:text-green1'>تسجيل حساب جدبد</button>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default Dialog;

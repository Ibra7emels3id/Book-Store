'use client'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { auth, database, db } from '../../../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { child, get, onValue, ref } from 'firebase/database';
import Loading from '@/app/components/Loading';

const Page = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({});
    const [user, loading, error] = useAuthState(auth);
    const userId = user?.uid;



    // Handle Submit Login
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = userCredential.user.uid;

            const dbRef = ref(database);
            get(child(dbRef, `users/${userId}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.val().role === 'user' ? router.push('/') : router.push('/admin')
                        toast.success("تم تسجيل الدخول بنجاح", {
                            position: "top-center",
                            autoClose: 2000,
                        });
                    } else {
                        console.log("No data available");
                        toast.error("لا توجد بيانات متوفرة للمستخدم");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    toast.error("حدث خطأ أثناء استرجاع بيانات المستخدم");
                });

        } catch (error) {
            console.error("Error during login:", error);
            toast.error("حدث خطأ أثناء تسجيل الدخول");
        }
    };


    // Check User Role
    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                if (snapshot.val()?.role === 'user') {
                    router.push('/')
                }else{
                    router.push('/admin')
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [userId, router]);

    // Set Loading
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex w-full">
                    <form className="space-y-4 font-[sans-serif] text-[#333]  max-w-md mx-auto bg-white w-full md:w-[50%] py-10 rounded-lg shadow-xl px-4 ">
                        <div className="flex items-center justify-center mb-10 ">
                            <h1 className='text-3xl font-bold text-green1 '>Login Admin</h1>
                        </div>
                        <div className="relative flex items-center">
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value })
                                }}
                                type="email"
                                placeholder="أدخل الايميل "
                                className="px-4 py-3 bg-[#f0f1f2] focus:ring-0 w-full text-sm border-none focus:outline-none rounded transition-all"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#bbb"
                                stroke="#bbb"
                                className="w-[18px] h-[18px] absolute left-4"
                                viewBox="0 0 682.667 682.667"
                            >
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path
                                        fill="none"
                                        strokeMiterlimit={10}
                                        strokeWidth={40}
                                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                        data-original="#000000"
                                    />
                                    <path
                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                        data-original="#000000"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="relative flex items-center">
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value })
                                }}
                                type="password"
                                placeholder="أدخل الباسورد"
                                className="px-4 py-3 bg-[#f0f1f2] border-none focus:ring-0 w-full text-sm border  focus:outline-none rounded transition-all"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#bbb"
                                stroke="#bbb"
                                className="w-[18px] h-[18px] absolute left-4 cursor-pointer"
                                viewBox="0 0 128 128"
                            >
                                <path
                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                    data-original="#000000"
                                />
                            </svg>
                        </div>
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="px-6 py-2.5 w-full !mt-8 text-sm bg-greenbg hover:bg-green-400 text-white rounded"
                        >
                            تسجيل الدخول
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;


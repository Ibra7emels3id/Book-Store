import { Modal, } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { auth, database } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ref, set } from 'firebase/database';


const Dialog = ({ openModal, setOpenModal }) => {
    const [OpenResolt, setOpenResolt] = useState('login')
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState('password')

    // Handle Submit Register
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const data = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = data?.user?.uid

            await updateProfile(auth.currentUser, {
                displayName: formData.name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            });

            function writeUserData() {
                set(ref(database, 'users/' + userId), {
                    username: formData.name,
                    email: formData.email,
                    role: 'user',
                    date: new Date().toDateString(),
                    time: new Date().toLocaleTimeString(),
                    image: 'https://example.com/jane-q-user/profile.jpg'
                });
            }
            writeUserData(userId);

            setOpenModal('hidden');
            setOpenResolt('login');
            setFormData({
                email: '',
                password: '',
                name: ''
            })
            toast.success('تم تسجيل حسابك بنجاح', {
                position: 'bottom-center',
                autoClose: 2000,
                type: 'success',
                progress: undefined
            });

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                toast.error("البريد الإلكتروني مسجل مسبقًا.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    type: "error"
                });
            } else if (errorCode === "auth/weak-password") {
                toast.error("كلمة المرور ضعيفة. يجب أن تكون على الأقل 6 أحرف.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    type: "error"
                });
            } else {
                toast.error("حدث خطأ أثناء التسجيل. حاول مرة أخرى.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    type: "error"
                });
            }
            console.error("Error Code:", errorCode, "Message:", errorMessage);
        }
    };




    // Handle Submit Login
    const handleLogin = async (e) => {
        e.preventDefault();
        !formData.email && setError({ ...error, email: 'ادخل الايميل رجاء ' })
        !formData.password && setError({ ...error, password: 'ادخل الباسورد رجاء ' })

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setOpenModal('hidden');
                return toast.success('تم تسجيل الدخول', {
                    position: 'bottom-center',
                    autoClose: 2000,
                    type: 'success',
                    progress: undefined
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/invalid-email") {
                    return toast.error('البريد غير مسجل', {
                        position: 'bottom-center',
                        autoClose: 3000,
                        type: 'error'
                    });
                }
                if (errorCode === "auth/wrong-password") {
                    return toast.error('تحقق من كلمة المرور', {
                        position: 'bottom-center',
                        autoClose: 3000,
                        type: 'error'
                    });
                }
                if (errorCode === "auth/user-not-found") {
                    return toast.error('البريد غير مسجل', {
                        position: 'bottom-center',
                        autoClose: 3000,
                        type: 'error'
                    });
                }
                if(errorMessage === 'auth/invalid-credential'){
                    return toast.error('تحقق من البيانات او الاتصال من الانترنت', {
                        position: 'bottom-center',
                        autoClose: 3000,
                        type: 'error'
                    });
                }
                if (errorMessage === 'auth/too-many-requests') {
                    return toast.error('عذر��ا، عدد الحاولات التي تم فيها أكثر من مرة كبيرا. يرجى المحاولة مرة أخرى بعد عدة دقا��ق.',{
                        position: 'bottom-center',
                        autoClose: 3000,
                        type: 'error'
                    })
                }
                toast.error('حدث خطا أثناء التسجيل حاول مره اخري ', {
                    position: 'bottom-center',
                    autoClose: 3000,
                    type: 'error'
                })
                setTimeout(() => {
                    setError({
                        email: '', password: '', name: ''
                    })
                }, 3000);
            });
    }



    // Handle Show Password
    const handlePasswordVisibility = () => {
        setShowPassword(showPassword === 'password' ? 'text' : 'password')
    }



    return (
        <>
            <div className={`${openModal} inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
                <div className={`${OpenResolt === 'login' ? 'flex-col' : 'hidden'} w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative`}>
                    <svg
                        onClick={() => {
                            setOpenModal('hidden');
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
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
                        <h4 className="text-3xl text-gray-800 font-extrabold">تسجيل الدخول</h4>
                        <p className="text-sm text-gray-500 mt-4">
                            قم بتسجيل الدخول إلى حسابك لمواصلة العملية
                        </p>
                    </div>
                    <form className="space-y-4">
                        <div className="relative flex items-center justify-between">
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                }}
                                value={formData.email}
                                type="email"
                                placeholder="أدخل الايميل"
                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-green-600 outline-none rounded-lg"
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
                                    setFormData({ ...formData, password: e.target.value });
                                }}
                                value={formData.password}
                                type={showPassword}
                                placeholder="أدخل الباسورد"
                                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-green-600 outline-none rounded-lg"
                            />
                            <svg
                                onClick={handlePasswordVisibility}
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
                        <div className="flex">
                            <input type="checkbox" className="w-4" />
                            <label className="text-sm mr-2 text-gray-500">تذكرنى</label>
                        </div>
                        <button
                            onClick={handleLogin}
                            type="submit"
                            className="px-5 py-2.5 !mt-8 w-full bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg tracking-wide"
                        >
                            تسجيل الدخول
                        </button>
                    </form>
                    <a
                        href="javascript:void(0)"
                        className="text-sm text-green-600 text-center mt-4 block hover:underline"
                    >
                        هل نسيت الباسورد؟
                    </a>
                    <hr className="my-8 border-gray-300" />
                    <p className="text-sm text-center text-gray-500">
                        قم بتسجيل حساب جديد؟{" "}
                        <button
                            onClick={() => {
                                setOpenResolt('register');
                            }}
                            type='button'
                            className="text-sm text-green-600 hover:underline"
                        >
                            تسجيل حساب
                        </button>
                    </p>
                </div>
                {/* register */}
                <div className={`${OpenResolt === 'register' ? 'flex-col' : 'hidden'} w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative`}>
                    <svg
                        onClick={() => {
                            setOpenModal('hidden');
                            setOpenResolt('login');
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
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
                        <h4 className="text-4xl text-gray-800 font-extrabold">تسجيل جديد</h4>
                        <p className="text-md text-gray-500 mt-4">قم بإنشاء حساب معنا</p>
                    </div>
                    <form className="space-y-4">
                        <div className="relative flex items-center">
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                }}
                                value={formData.name}
                                type="text"
                                placeholder="أدخل الاسم"
                                className="px-4 py-3 bg-white text-gray-800 w-full text-md border border-gray-300 focus:border-green-600 outline-none rounded-lg"
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
                                    setFormData({ ...formData, email: e.target.value });
                                }}
                                value={formData.email}
                                type="email"
                                placeholder="أدخل الايميل"
                                className="px-4 py-3 bg-white text-gray-800 w-full text-md border border-gray-300 focus:border-green-600 outline-none rounded-lg"
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
                        <div className="relative flex items-center">
                            <input
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                }}
                                value={formData.password}
                                type={showPassword}
                                placeholder="أدخل الباسورد"
                                className="px-4 py-3 bg-white text-gray-800 w-full text-md border border-gray-300 focus:border-green-600 focus:outline-none rounded-lg"
                            />
                            <svg
                                onClick={handlePasswordVisibility}
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
                        <div className="flex">
                            <input type="checkbox" className="w-4 outline-none focus:outline-none" />
                            <label className="text-sm mr-4 text-gray-500">
                                هل توافق علي{" "}
                                <a
                                    href="javascript:void(0)"
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    الشروط والاحكام
                                </a>
                            </label>
                        </div>
                        <div className="!mt-8 space-y-4">
                            <button
                                onClick={handleRegister}
                                type="submit"
                                className="px-5 py-2.5 w-full bg-green-600 hover:bg-green-700 text-white text-md rounded-lg tracking-wide"
                            >
                                تسجيل حساب
                            </button>
                            <button
                                type="button"
                                className="px-5 py-2.5 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded-lg tracking-wide"
                            >
                                تسجيل باستخدام جوجل
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    fill="#fff"
                                    className="inline mr-4"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="#fbbd00"
                                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                        data-original="#fbbd00"
                                    />
                                    <path
                                        fill="#0f9d58"
                                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                        data-original="#0f9d58"
                                    />
                                    <path
                                        fill="#31aa52"
                                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                        data-original="#31aa52"
                                    />
                                    <path
                                        fill="#3c79e6"
                                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                        data-original="#3c79e6"
                                    />
                                    <path
                                        fill="#cf2d48"
                                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                        data-original="#cf2d48"
                                    />
                                    <path
                                        fill="#eb4132"
                                        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                        data-original="#eb4132"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <hr className="my-8 border-gray-300" />
                    <p className="text-sm text-center text-gray-500">
                        هل لديك حساب؟ {" "}
                        <button
                            onClick={() => {
                                setOpenResolt('login');
                            }}
                            className="text-sm text-green-600 hover:underline"
                        >
                            تسجيل الدخول
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Dialog;

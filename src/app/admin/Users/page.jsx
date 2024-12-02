import React from 'react';
import Header from '../components/Header';
import FormDataUser from './_components/FormDataUser';
import Loading from '@/app/components/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../FirebaseConfig';
const Page = () => {

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto mr-[50px] md:mr-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <h1 className="text-4xl font-bold text-center mb-4">جميع المستخدمين</h1>
                        <FormDataUser />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

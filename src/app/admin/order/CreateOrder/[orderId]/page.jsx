import React, { use } from 'react';
import FormOrder from './_components/FormOrder';
import Header from '@/app/admin/components/Header';

const Page = ({ params }) => {
    const { orderId } = use(params)
    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full mr-[50px] md:mr-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-4xl font-extrabold text-center mb-4">أضافه الي القائمة</h2>
                        <FormOrder Id={orderId} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

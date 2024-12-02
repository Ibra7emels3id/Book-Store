import Header from '../../../components/Header';
import React, { use } from 'react';
import FormEdit from './_components/FormEdit';

const Page = ({ params }) => {
    const { EditId } = use(params)
    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full ml-[50px] md:mr-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-4xl font-extrabold text-center mb-4">تعديل بيانات المنتج</h2>
                        <FormEdit Id={EditId} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

import Header from '@/app/components/Header';
import Form from './_components/Form';

const Page = () => {

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full ml-[50px] md:mr-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-4xl font-extrabold text-center mb-4">أضافه منتج جديد</h2>
                        <Form />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

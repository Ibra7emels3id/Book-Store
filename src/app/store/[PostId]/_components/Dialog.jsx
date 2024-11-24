import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const Dialog = ({ current, dataDownloaded , Namepdf , HandleDownLoadPdf }) => {


    return (
        <>
            <div className={`${current} fixed top-0 left-0 inset-0 px-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}>
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative mx-auto text-center">
                    <div className="icon bg-green-500 w-20 h-20 m-auto rounded-full flex items-center justify-center absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                        <CloudDownloadIcon sx={{ fontSize: '50px', color: 'white' }} />
                    </div>
                    <div className="mt-12">
                        <h3 className="text-gray-800 text-2xl font-bold flex-1">تحميل ملف pdf!</h3>
                        <p className="text-lg font-semibold text-gray-600 mt-3">
                            تحميل ملف pdf بأسم <br />
                            <span className='text-green-500 text-lg'>{Namepdf}</span>
                        </p>
                        <div className="but flex items-center mt-5 gap-3">
                            <a href={dataDownloaded}  target="_blank" download className="px-6 py-2.5 block w-full rounded-md text-white text-lg font-semibold tracking-wide border-none outline-none bg-green-500 hover:bg-green-600">تحميل الملف</a>
                            <button onClick={()=>{
                                HandleDownLoadPdf()
                            }} className="px-6 py-2.5 block w-full rounded-md text-white text-lg font-semibold tracking-wide border-none outline-none bg-red-500 hover:bg-red-600">ألغاء</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dialog;

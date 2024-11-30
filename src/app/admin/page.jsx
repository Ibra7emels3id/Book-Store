'use client'
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../../../FirebaseConfig";
import { useRouter } from "next/navigation";
import { child, get, onValue, ref } from "firebase/database";
import { useEffect } from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Loading from "../components/Loading";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CategoryIcon from '@mui/icons-material/Category';
import Header from "./components/Header";




export default function Home() {
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth);
    const userId = user?.uid

    // Check User Role
    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                if (snapshot.val()?.role === 'user' || !userId) {
                    router.push('/')
                }else{
                    router.push('/admin')
                }
            } else {
                console.log("No data available");
                router.push('/')
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [userId, router , user]);

    // set Loading
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full ml-[50px] md:mr-[250px] mt-[70px] p-2 md:p-5">
                    <div className="flex flex-col w-full m-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center justify-center gap-3 bg-white border py-5">
                                <PeopleAltIcon sx={{ fontSize: '70px', color: '#3aaf9e' }} />
                                <h1 className="text-5xl font-bold text-gray-600">234+</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 bg-white border py-5">
                                <AddBusinessIcon sx={{ fontSize: '70px', color: '#3aaf9e' }} />
                                <h1 className="text-5xl font-bold text-gray-600">342+</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 bg-white border py-5">
                                <CategoryIcon sx={{ fontSize: '70px', color: '#3aaf9e' }} />
                                <h1 className="text-5xl font-bold text-gray-600">342+</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 bg-white border py-5">
                                <LibraryAddCheckIcon sx={{ fontSize: '70px', color: '#3aaf9e' }} />
                                <h1 className="text-5xl font-bold text-gray-600">342+</h1>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-800">Welcome {user?.email}</h1>
                            </div>
                            <div className="flex-1 text-right">
                                <button onClick={() => auth.signOut()} className="bg-gray-800 text-white py-2 px-4 rounded-md">Logout</button>
                                {/* <Image
                                    src={user?.photoURL}
                                    alt={user?.email}
                                    className="rounded-full w-24 h-24 object-cover"
                                    layout="fixed"
                                    
                                    width={60}
                                    
                                    height={60}
                                    /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

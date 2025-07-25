import { useEffect, useState } from "react";
import axios from 'axios';
import './homePage.css';
import { Link } from 'react-router-dom'
export default function Home(){
    const [ Data, setData ] = useState([]);
    const token = localStorage.getItem("token");
    const handleDelete = (id) => {
        if(confirm(`Do you want to delete user ${id}, this action cannot be undone!`) == true){
            try {
                axios.delete(`http://localhost:5000/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(setData(prevData => prevData.filter(item => item.id !== id)));
            } catch (error) {
                console.log('Err: ',error);
            }
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5000`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setTimeout(() => {
                setData(res.data);
            }, 1000);
            console.log('res: ',res.data);
        })
        .catch((err) => console.log(err));
    }, []);
    return (
        <>
            {(Data.length !== 0) && 
                <div className="flex flex-col justify-center items-center pt-20">
                    <div className="flex justify-between w-3/4">
                        <div className="flex flex-row items-center text-white">
                            <p>Username</p>
                        </div>
                        <Link to='/Login' className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Disconnect
                            </span>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-3 flex-wrap pt-10 justify-center w-full">
                        {
                            Data.map((item,index) => (
                            <div key={index} className="w-full p-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex flex-col items-center pb-10">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.name}</h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.email}</span>
                                    <div className="flex mt-4 md:mt-6">
                                        <Link to={`/Update/${item.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</Link>
                                        <button className="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        

                    </div>
                </div>
            }
            {(Data.length === 0) && 
                <div role="status" className="flex flex-row w-screen h-screen justify-center items-center">
                    <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </>
    );
}
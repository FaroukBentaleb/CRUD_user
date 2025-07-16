import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Update(){
    const [values, setValues] = useState({
        name: '',
        email: ''
    });
    const token = localStorage.getItem("token");
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setTimeout(() => {
                setValues(res.data[0]);
            }, 1000);
        })
        .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        document.getElementById('name').value = values.name;
        document.getElementById('email').value = values.email;
        document.getElementById('pwd').value = values.pwd;
    },[values])
    const handleName = (e) => { 
        setValues({ ...values, name: e.target.value });
        if(e.target.value.length < 2){ 
            document.getElementById('err_name').textContent  = 'Name must be at least 2 letters';
            document.getElementById('err_name').style.color = 'red';
            document.getElementById('name').style.borderColor = 'red';
        }
        else{
            document.getElementById('err_name').textContent = '';
            document.getElementById('name').style.borderColor = '';
        }
    }
    const handleEmail = (e) => { 
        setValues({ ...values, email: e.target.value });
        if (e.target.value.length < 5 || !e.target.value.includes('@')) {
            document.getElementById('err_email').textContent  = 'Enter a valid email';
            document.getElementById('err_email').style.color = 'red';
            document.getElementById('email').style.borderColor = 'red';
        }
        else{
            document.getElementById('err_email').textContent = '';
            document.getElementById('email').style.borderColor = '';
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:5000/Update/${id}`,values,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                alert(res.data.Message);
                window.location.href='/';
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Change Infos
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input onChange={handleName} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>
                                    <label id="err_name"></label>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handleEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                    <label id="err_email"></label>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input disabled type="password" name="password" id="pwd" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div className="flex flex-row gap-2 pt-3">
                                    <Link to={'/'} className="w-1/2 text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border dark:bg-[#1E2939] dark:hover:bg-[#101828] dark:focus:ring-[#1e40af]">Back Home</Link>
                                    <button type="submit" className="cursor-pointer w-1/2 text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
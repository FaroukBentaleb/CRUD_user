import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export  default function Login(){
    const [ data, setData ] = useState({
        email: '',
        pwd: ''
    });
    const handleEmail = (e) => { 
        setData({ ...data, email: e.target.value });
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
    const handlePwd = (e) => { 
        setData({ ...data, pwd: e.target.value });
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(e.target.value)) {
            document.getElementById('err_pwd').textContent  = 'Password must contain at least 8 characters (1 uppercase, 1 lowercase and 1 number)';
            document.getElementById('err_pwd').style.color = 'red';
            document.getElementById('pwd').style.borderColor = 'red';
        }
        else{
            document.getElementById('err_pwd').textContent = '';
            document.getElementById('pwd').style.borderColor = '';
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pwd = document.getElementById('pwd').value;
        if(email && pwd){
            axios.post(`http://localhost:5000/Login`,data)
            .then((res) => {
                alert(res.data.Message);
                if (res.data.accessToken) {
                    localStorage.setItem('token', res.data.accessToken);
                    window.location.href = '/';
                }
            })
            .catch((err) => console.log(err));
        }
        
        else{
            alert('Please fill in your data!');
        }
        console.log(localStorage.getItem("token"));

    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handleEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                    <label id="err_email"></label>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handlePwd} type="password" name="password" id="pwd" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                    <label id="err_pwd"></label>
                                </div>
                                <button type="submit" className="cursor-pointer w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-center items-center w-full gap-2">
                                    Don't have an account yet? <Link to={'/Signup'} className="font-medium text-[#2563eb] hover:underline dark:text-[#3b82f6]">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
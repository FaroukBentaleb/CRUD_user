import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create(){
    const [values, setValues] = useState({
        name: '',
        email: '',
        pwd: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5000/New',values)
            .then(res => console.log(res));
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col h-screen w-screen justify-center items-center">
                    <div className="flex flex-col bg-amber-400 rounded-2xl h-3/4 w-1/2 justify-center items-center">
                        <h2>Create an account</h2>
                        <div className="flex flex-col justify-center items-center h-4/5">
                            <div>
                                <label htmlFor="name">Username </label>
                                <input type="text" name="name" onChange={e => setValues({ ...values, name: e.target.value })}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email </label>
                                <input type="email" name="email" onChange={e => setValues({ ...values, email: e.target.value })}/>
                            </div>
                            <div>
                                <label htmlFor="pwd">Password </label>
                                <input type="password" name="pwd" onChange={e => setValues({ ...values, pwd: e.target.value })}/>
                            </div>
                            <button className="bg-green-300 cursor-pointer">Submit</button>
                            <Link to={'/'}>Back Home</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
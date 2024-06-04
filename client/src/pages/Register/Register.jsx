import React, { useContext, useState } from 'react';
import './register.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../App';
import toast from 'react-hot-toast';
import { Context } from '../..';


const Register = () => {

    const { isAuthonticated, setIsAuthonticated } = useContext(Context);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            console.log(name, email, password);

            const { data } = await axios.post(`${server}/user/register`,
                {
                    name,
                    email,
                    password
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                },
            );


            setIsAuthonticated(true);
            toast.success(data.message);
        } catch (error) {
            setIsAuthonticated(false);
            toast.error(error.response.data.message);
            console.log(error);

        }
    };

    if (isAuthonticated) return <Navigate to={"/"} />;

    return (
        <div className='loginPage'>
            <div className="loginWinodw">

                <div className="loginleft">
                    <img src="loginImg.png" alt="" />
                </div>

                <div className="loginRight">

                    <h1>SignUp</h1>

                    <form onSubmit={submitHandler}>

                        <input type="text" placeholder='Name' name='name' onChange={(e) => setName(e.target.value)} required />
                        <input type="text" placeholder='Email' name='email' onChange={(e) => setEmail(e.target.value)} required />
                        <input type="text" placeholder='Password' name="password" onChange={(e) => setPassword(e.target.value)} required />

                        <button >SignUp</button>

                    </form>
                    <Link to={'/login'}>LogIn</Link>

                </div>
            </div>


        </div >
    );
};

export default Register;
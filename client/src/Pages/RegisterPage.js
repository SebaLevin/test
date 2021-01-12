import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';
import { useHistory } from 'react-router-dom';


const RegisterPage = (props) => {

    const history = useHistory();

    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passRef = React.createRef();

    const registerUser = (props) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passRef.current.value;

        axios
            .post('http://localhost:8000/user/register', {
                name,
                email, 
                password,
            })
            .then((response) => {
                makeToast('success', response.data.message);
                history.push("/login");
            })
            .catch((error) => {
                if(error && error.response && error.response.data && error.response.data.message){
                    makeToast("error", error.response.data.message);
                }
            })
    }

    return (
        <div className='card'>
            <div className='cardHeader'> Registration </div>
            <div className='cardBody'></div>      
                <div className='inputGroup'>
                    <label htmlFor="name">Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        placeholder='Jhon Doe'
                        ref={nameRef}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='example@example.com'
                        ref={emailRef}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        placeholder='Insert Your Password'
                        ref={passRef}
                    />
                    <button onClick={registerUser} >Register</button>
                    <p className="loginPage">Already have an account?<a href="/login"> Click Here</a></p>
                </div>
        </div>
    )
};

export default RegisterPage;
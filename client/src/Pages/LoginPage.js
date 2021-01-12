import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';
import { useHistory } from 'react-router-dom'

const LoginPage = (props) => {
    const history = useHistory();

    const emailRef = React.createRef();
    const passRef = React.createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passRef.current.value;

        axios
            .post('http://localhost:8000/user/login',  {
                headers:{ 
                    Authorization: 'Bearer' + localStorage.getItem('CC_Token'),
                },
                email,
                password
            })
            .then((response) => {
                makeToast('success', response.data.message);
                localStorage.setItem('CC_Token', response.data.token)
                history.push("/dashboard");
            })
            .catch((error) => {
                if(error && error.response && error.response.data && error.response.data.message){
                    makeToast("error", error.response.data.message);
                }
            })
    };

    const createAccount = () => {
        history.push('/register')
    }

    return (
        <div className='card'>
            <div className='cardHeader'> Login </div>
            <div className='cardBody'></div>      
                <div className='inputGroup'>
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
                    <button onClick={loginUser}>Login</button>
                    <button onClick={createAccount}>Create an account</button>
                </div>
        </div>
    )
};

export default LoginPage;
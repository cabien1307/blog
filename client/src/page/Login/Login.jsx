import { Link } from 'react-router-dom'
import './login.css'
import { useRef } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Login() {

    const userRef = useRef();
    const passRef = useRef();

    const {dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_START' })
        try {
            const res = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passRef.current.value
            })

            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' })
        }
    }


    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label >Username</label>
                <input className="loginInput" type="username" placeholder="Enter your username ..." ref={userRef} />

                <label >Password</label>
                <input className="loginInput" type="password" placeholder="Enter your password ..." ref={passRef} />

                <button className="loginBtn" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterBtn">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
        </div>
    );
}



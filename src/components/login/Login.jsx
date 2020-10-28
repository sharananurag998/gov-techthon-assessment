import React from 'react';
import './Login.css'

function Login() {
    return (
        <div className="container">
            <div className="login__header">
                <h1>Gov-TechThon</h1>
            </div>
            <div className="login__container">
                <div className="login">
                    <h1 className="login__heading">Jury Login</h1>
                    <form >
                        <label htmlFor="mobNumber">Mobile Number</label>
                        <input type="tel" name="mobNumber" id="mobNumber" placeholder="Enter your Mobile Number" required/>
                        <br/>
                        <button type="submit" className="login__button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;

import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    });

    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(result.name){
            console.log(JSON.stringify(result));
            localStorage.setItem('user', JSON.stringify(result));
            navigate("/");
        }
        else{
            alert("Enter correct email & password!");
        }
        
    }
    return(
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Login</h2>
            </div>
            <input className="inputBox" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" className="btn" onClick={handleLogin}>Login</button>

        </div>
    )
}

export default Login;
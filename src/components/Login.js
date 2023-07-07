import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {

    const [credentials, setcredentials] = useState({email:"",password:""})
    let history= useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNGVhOTI4Mjg3MDMzZjY3N2E2ZGVjIn0sImlhdCI6MTY3Njk5NTI0Mn0.3Wc162-IXld2ZQZkK0OPz7Gc3xwoL-P5GyiJFKPNOSU"
            },
            body: JSON.stringify({email: credentials.email ,password:credentials.password })

        });

        const json = await response.json();
        console.log(json)

        if(json.success)
        {
            //Save the auth and redirect..
            localStorage.setItem('token',json.authtoken)
            history("/")
        }
        else{
            alert("Incalid credentials")
        }
    }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"  className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password"  onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login

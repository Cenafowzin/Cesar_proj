import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register(props) {
    const [username ,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        createUser().then(data => {
            props.setToken(data.access_token)
            localStorage.setItem('token', JSON.stringify(data.access_token));
            navigate("/board");
        })
    }

    async function createUser() {
        const formData = {
            username: username,
            password: password
        };

        const response = await fetch('http://127.0.0.1:8000/users', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify(formData)
        });
        const data = await response.json();

        return data;
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>
                Username <input type="text" onChange={(e => setUsername(e.target.value))} />
            </p>
            <p>
                Password <input type="password" onChange={(e => setPassword(e.target.value))} />
            </p>
            <p>
                <button>Register</button>
            </p>
            <p>
                Já tem um conta? <Link to="/login">Logue aqui</Link>
            </p>
        </form>
    )
}

export default Register;
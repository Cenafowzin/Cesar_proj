import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Input = styled.input`
    border: 0px;
    text-align: center;
    width: 134px;
    height: 29px;
    left: 59px;
    top: 225px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px rgba(108, 108, 108, 0.9);
    border-radius: 40px;
`

const Button = styled.button`
    border: 0px;
    color: white;
    width: 134px;
    height: 29px;
    left: 59px;
    top: 323px;
    background: #862CBD;
    box-shadow: 0px 4px 4px rgba(71, 31, 122, 0.7);
    border-radius: 40px;
`

function Login(props) {
    const [username ,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        loginUser().then(data => {
            props.setToken(data.access_token)
            localStorage.setItem('token', JSON.stringify(data.access_token));
            navigate("/board");
        })
    }

    async function loginUser() {
        const searchParams = new URLSearchParams();
        searchParams.append('username', username);
        searchParams.append('password', password);
        

        const response = await fetch('http://127.0.0.1:8000/token', {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },

            body: searchParams.toString()
        });
        const data = await response.json();

        return data;
    }

    return(
        <form onSubmit={handleSubmit}>
            <Container>
                <p>
                    <Input type="text" placeholder='Usuário' onChange={(e => setUsername(e.target.value))} />
                </p>
                <p>
                    <Input type="password" placeholder='Senha' onChange={(e => setPassword(e.target.value))} />
                </p>
                <p>
                    <Button>Login</Button>
                </p>
            </Container>
        </form>
    )
}

export default Login;
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

function EmpLogout(props) {
    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem('token');
        navigate("/emplogin")
    }

    return (
        <div>
            <Button onClick={logoutUser}>Log out</Button>
        </div>
    )
}

export default EmpLogout;
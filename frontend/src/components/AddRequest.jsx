import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Desc = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    border: 0px;
    box-sizing: border-box;
    width: 134px;
    height: 29px;
    left: 59px;
    top: 377px;
    background: #65208E;
    box-shadow: 0px 4px 4px rgba(71, 31, 122, 0.7);
    border-radius: 40px;
    color: white;
`

const ProbDesc = styled.input`
    width: 236px;
    height: 84px;
    background: #D9D9D9;
    text-align: center;
    border: 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding: 8px;
    margin: 4px;
    margin-bottom: 8px;
`
const Button2 = styled.button`
  width: 250px;
  height: 40px;
  left: 9px;
  top: 222px;
  background: #D9D9D9;
  border: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 8px;
  margin: 4px;
  margin-bottom: 8px;
`

function AddRequest(props) {
    const[desc, setDesc] = useState("");
    const navigate = useNavigate();

    function handleInputChange() {
        props.type==="description" ? addDescription(desc): props.onNewColumn(desc);
        setDesc("");
        navigate("/timer")
    }

    const addDescription = (description) => {
        props.setDescription(description)
    }

    return (
        <Desc>
            <ProbDesc type="text" placeholder="Descreva seu problema aqui" value={desc} onChange={e => setDesc(e.target.value)} />
            <Button2>Enviar imagem</Button2>
            <Button onClick={handleInputChange}>ENVIAR</Button>
        </Desc>
    )
}

export default AddRequest;
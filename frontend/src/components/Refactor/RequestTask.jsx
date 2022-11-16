import React, { useState } from "react";
import styled from "styled-components";

const SubTask = styled.button`
    border: 1px solid black;
    border-radius: 20px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${({selected}) => selected ? "purple": "white"};
    color: ${({selected}) => selected ? "white": "black"};
`;

function RequestTask(props) {
    const [active, setActive] = useState(props.task.active);

    const handleClick = () => {
        props.onSelect(props.task.id)
        setActive(!active)
    }

    return (
        <SubTask onClick={handleClick} selected={active}>
            {props.task.content}
        </SubTask>
    )
}

export default RequestTask;
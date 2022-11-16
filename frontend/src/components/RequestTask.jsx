import React, { useState } from "react";
import styled from "styled-components";

const SubTask = styled.button`
    border: 0px;
    border-radius: 40px;
    padding: 8px;
    margin-bottom: 15px;
    height: 41px;
    width: 180px;
    left: 36px;
    top: 119px;
    background-color: ${({selected}) => selected ? "#65208E": "rgba(156, 72, 208, 0.4)"};
    color: ${({selected}) => selected ? "white": "black"};
    box-shadow: 0px 4px 4px rgba(156, 72, 208, 0.82);
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
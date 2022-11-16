import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 0px;
    box-sizing: border-box;
    height: 29px;
    margin: 10px;
    left: 59px;
    top: 377px;
    background: #65208E;
    box-shadow: 0px 4px 4px rgba(71, 31, 122, 0.7);
    border-radius: 40px;
    color: white;
`
const Input = styled.input`
    background: #D9D9D9;
    text-align: center;
    border: 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding: 8px;
    margin: 4px;
    margin-bottom: 8px;
`

function AddColumn(props) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true);
    const[value, setValue] = useState("");
    const[desc, setDesc] = useState("");

    function handleInputChange() {
        setShowNewColumnButton(true);
        addNewColumn(value, desc);
        setValue("");
        setDesc("");
    }

    function addNewColumn(title, description) {
        const newColumnOrder = Array.from(props.board.columnOrder);
        const newColumnId = 'column-' + Math.floor(Math.random() * 1000000);
        newColumnOrder.push(newColumnId);

        const newColumn = {
            id: newColumnId,
            title: title,
            taskIds: [],
            description: description,
        };

        props.setBoard({
            ...props.board,
            columns: {
                ...props.board.columns,
                [newColumnId]: newColumn
            },
            columnOrder: newColumnOrder
        });
    }

    return (
        <div>
            {
                showNewColumnButton ?
                <Button onClick={() => setShowNewColumnButton(false)}>New Column</Button>:
                <Input type="text" value={value} onChange={e => setValue(e.target.value)} onBlur={handleInputChange} />
            }
        </div>
    )
}

export default AddColumn;
import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    border: 0px;
    box-sizing: border-box;
    width: 70px;
    height: 29px;
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

function AddTask(props) {
    const [showNewTaskButton, setShowNewTaskButton] = useState(true);
    const [value, setValue] = useState("");

    function handleInputChange() {
        setShowNewTaskButton(true);
        addNewTask(props.columnId, value);
        setValue('');
    }

    function addNewTask(columnId, content) {
        const newTaskId = 'task-' + Math.floor(Math.random() * 1000000);
        const column = props.board.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.push(newTaskId);

        const newTask = {
            id: newTaskId,
            content: content
        }

        props.setBoard({
            ...props.board,
            tasks: {
                ...props.board.tasks,
                [newTaskId]: newTask
            },
            columns: {
                ...props.board.columns,
                [columnId]: {
                    ...props.board.columns[columnId],
                    taskIds: newTaskIds
                }
            }
        })
    }

    return (
        <div>
            {
                showNewTaskButton ?
                <Button onClick={() => setShowNewTaskButton(false)}>New</Button>:
                <Input type="text" value={value} onChange={e => setValue(e.target.value)} onBlur={handleInputChange} />
            }
        </div>
    )
}

export default AddTask;
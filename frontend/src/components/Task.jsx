import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border: 0px;
    border-radius: 40px;
    padding: 8px;
    margin-bottom: 15px;
    background-color:rgba(156, 72, 208, 0.4);
    color: black;
    box-shadow: 0px 4px 4px rgba(156, 72, 208, 0.82);
`

function Task(props) {
    function deleteTask(columnId, index, taskId) {
        const column = props.board.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(index, 1);

        const tasks = props.board.tasks;
        const {[taskId]: oldTask, ...newTask} = tasks;
        
        props.setBoard({
            ...props.board,
            tasks: {
                ...newTask
            },
            columns: {
                ...props.board.columns,
                [columnId]: {
                    ...column,
                    taskIds: newTaskIds
                }
            }
        });
    }

    return (
        <Container>
            {props.task.content}
            <span onClick={() => deleteTask(props.columnId, props.index, props.task.id)}> x</span>
        </Container>
    )
}

export default Task;
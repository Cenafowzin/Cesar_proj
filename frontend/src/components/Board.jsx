import React, { useState, useEffect } from 'react';
//import { DragDopContext, Droppable } from 'react-beatiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import AddColumn from './AddColumn';
import { Navigate } from 'react-router-dom';
import Logout from './Logout';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F5F5F5;
`

function Board(props) {
    const initialData = {tasks: {}, columns: {}, columnOrder: []};
    const [board, setBoard] = useState(initialData);
    
    async function fetchBoard() {
        const response = await fetch('http://127.0.0.1:8000/board', {
            headers: {
                "Authorization": "Bearer " + props.token
            }
        });
        const data = await response.json();
        return data.board;
    }

    async function saveBoard() {
        const response = await fetch('http://127.0.0.1:8000/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + props.token
            },
            body: JSON.stringify(board),
        });
        const data = await response.json();
    }

    useEffect(() => {
        fetchBoard().then(data => setBoard(data));
    }, []);

    useEffect(() => {
        saveBoard();
    }, [board]);

    if (!props.token) {
        return <Navigate to="/login" replace />
    };

    return (
        <Container>
            <AddColumn board={board} setBoard={setBoard} />
            <Logout />
            {
                board.columnOrder.map((columnId, index) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(taskIds => board.tasks[taskIds]);
                    return <Column key={column.id} column={column} tasks={tasks} index={index} board={board} setBoard={setBoard} />;
                })
            }
        </Container>
    )
}

export default Board;
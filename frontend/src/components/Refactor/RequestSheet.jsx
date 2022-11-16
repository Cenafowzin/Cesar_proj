import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RequestColumn from './RequestColumn';
import { Navigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

function RequestSheet() {
    const initialData = {tasks: {}, columns: {}, description: "", columnOrder: []};
    const [board, setBoard] = useState(initialData);
    
    async function fetchBoard() {
        const response = await fetch('http://127.0.0.1:8000/requestsheet');
        const data = await response.json();
        return data.board;
    }

    useEffect(() => {
        fetchBoard().then(data => setBoard(data));
    }, []);

    return (
        <Container>
            {
                board.columnOrder.map((columnId) => {
                    const column = board.columns[columnId];
                    console.log(board)
                    const tasks = column.taskIds.map(taskIds => ({...board.tasks[taskIds], active: false}));
                    return <RequestColumn key={column.id} column={column} tasks={tasks} board={board} setBoard={setBoard} />;
                })
            }
        </Container>
    )
}

export default RequestSheet;
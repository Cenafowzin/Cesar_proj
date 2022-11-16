import React, { useState, useEffect } from 'react';
//import { DragDopContext, Droppable } from 'react-beatiful-dnd';
import styled from 'styled-components';
import EmpColumn from './EmpColumn';
import { Navigate } from 'react-router-dom';
import EmpLogout from './EmpLogout';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Requests(props) {
    const initialData = {tasks: {}, columns: {}, columnOrder: []};
    const [board, setBoard] = useState(initialData);
    
    async function fetchBoard() {
        const response = await fetch('http://127.0.0.1:8000/requests', {
            headers: {
                "Authorization": "Bearer " + props.token
            }
        });
        const data = await response.json();
        return data.board;
    }

    useEffect(() => {
        fetchBoard().then(data => setBoard(data));
    }, []);

    if (!props.token) {
        return <Navigate to="/emplogin" replace />
    };

    return (
        <Container>
            <EmpLogout />
            {
                board.columnOrder.map((columnId, index) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(taskIds => board.tasks[taskIds]);
                    return <EmpColumn key={column.id} column={column} tasks={tasks} index={index} board={board} setBoard={setBoard} />;
                })
            }
        </Container>
    )
}

export default Requests;
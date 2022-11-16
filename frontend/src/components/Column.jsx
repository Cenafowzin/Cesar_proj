import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Task from './Task';
import AddTask from './AddTask';

const Container = styled.div`
  margin: 8px;
  border-radius: 40px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  background-color: rgba(156, 72, 208, 0.4);
  box-shadow: 0px 4px 4px rgba(156, 72, 208, 0.82);
`;

const Title = styled.h3`
  padding: 5px;
  color: #471F7A;
`;

const TaskList = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Column(props) {
    function deleteColumn(columnId, index) {
        const columnTasks = props.board.columns[columnId].taskIds;

        const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
            const {[currentValue]: oldTask, ...newTasks} = previousValue;
            return newTasks;
        }, props.board.tasks);

        const columns = props.board.columns;
        const {[columnId]: oldColumn, ...newColumns} = columns;

        const newColumnOrder = Array.from(props.board.columnOrder);
        newColumnOrder.splice(index, 1);

        props.setBoard({
            tasks: {
                ...finalTasks,
            },
            columns: {
                ...newColumns,
            },
            columnOrder: newColumnOrder
        });
    }

    return(
        <Container>
            <Title>
                {props.column.title}
                <span onClick={() => deleteColumn(props.column.id, props.index)}> x</span>
            </Title>
            <TaskList>
                {
                    props.tasks.map((task, index) => 
                        (<Task key={task.id} task={task} index={index} columnId={props.column.id} board={props.board} setBoard={props.setBoard} />)
                    )
                }
            <AddTask board={props.board} setBoard={props.setBoard} columnId={props.column.id} />
            </TaskList>
        </Container>
    )
}

export default Column;
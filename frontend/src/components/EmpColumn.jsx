import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EmpTask from "./EmpTask";
import MiniTimer from "./MiniTimer";

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

const Desc = styled.div`
  width: 236px;
  height: 84px;
  background: #d9d9d9;
  border: 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  padding: 8px;
  margin: 4px;
  margin-bottom: 8px;
`;

const Title = styled.h3`
    color: #471F7A;
`;

const TaskList = styled.div`
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
`;

function RequestColumn(props) {
  const [showEmp, setShowEmp] = useState(false);

  function deleteColumn(columnId, index) {
    const columnTasks = props.board.columns[columnId].taskIds;

    const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
      const { [currentValue]: oldTask, ...newTasks } = previousValue;
      return newTasks;
    }, props.board.tasks);

    const columns = props.board.columns;
    const { [columnId]: oldColumn, ...newColumns } = columns;

    const newColumnOrder = Array.from(props.board.columnOrder);
    newColumnOrder.splice(index, 1);

    props.setBoard({
      tasks: {
        ...finalTasks,
      },
      columns: {
        ...newColumns,
      },
      columnOrder: newColumnOrder,
    });
  }

  return (
    <Container>
      <Title>{props.column.title}</Title>
      <MiniTimer />
      <TaskList>
        {props.tasks.map((task, index) => (
          <EmpTask
            key={task.id}
            task={task}
            index={index}
            columnId={props.column.id}
            board={props.board}
            setBoard={props.setBoard}
          />
        ))}
      </TaskList>
      <div>Descrição:</div>
      <Desc>{props.column.description}</Desc>
      <Button2>Ver imagem</Button2>
      <div>
        {!showEmp ? (
          <Button onClick={() => setShowEmp(true)}>Adicionar</Button>
        ) : (
          <h4>Joseane</h4>
        )}
      </div>
      <div>
        {!showEmp ? (
          <></>
        ) : (
          <Button onClick={() => deleteColumn(props.column.id, props.index)}>
            Concluir
          </Button>
        )}
      </div>
    </Container>
  );
}

export default RequestColumn;

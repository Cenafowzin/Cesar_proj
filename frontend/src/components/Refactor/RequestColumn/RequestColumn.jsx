import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RequestTask from "./RequestTask";
import AddRequest from "./AddRequest";

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;

const Title = styled.h3`
  padding: 5px;
`;

const TaskList = styled.div`
  padding: 8px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 8px;
  border: 1px solid black;
  border-radius: 20px;
`;

const requestModel = { title: "", tasks: [], description: "" };

function RequestColumn({ column, tasks, board, setBoard }) {
  const [active, setActive] = useState(false);
  const [request, setRequest] = useState(requestModel);

  useEffect(() => {
    setRequest({
      ...request,
      title: column.title,
      tasks,
    });
  }, []);

  const handleSelectedTask = (id) => {
    setRequest((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => {
        return task.id === id ? { ...task, active: !task.active } : task;
      }),
    }));
  };

  const handleDescription = (description) => {
    const newColumnOrder = Array.from(board.columnOrder);
    const newColumnId = "column-" + Math.floor(Math.random() * 1000000);
    newColumnOrder.push(newColumnId);

    const activeTasks = request.tasks.filter((task) => task.active);

    async function saveBoard(newBoard) {
        const response = await fetch('http://127.0.0.1:8000/requestsheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBoard),
        });
        const data = await response.json();
    };

    const newColumn = {
      id: newColumnId,
      taskIds: activeTasks.map((task) => task.id),
      title: request.title,
      description: description,
    };

    const newBoard = {
        ...board,
        columnOrder: newColumnOrder,
      };

    newBoard.columns[newColumnId] = newColumn;

    setRequest((prev) => ({
      ...prev,
      description,
    }));

    saveBoard(newBoard)
  };

  return (
    <Container>
      <Title onClick={() => setActive(!active)}>{column.title}</Title>
      {active && (
        <>
          <TaskList>
            {tasks.map((task) => (
              <RequestTask
                key={task.id}
                task={task}
                onSelect={handleSelectedTask}
              />
            ))}
          </TaskList>
          <Button>Enviar imagem</Button>
          <div>Descreva seu problema:</div>
          <AddRequest
            type="description"
            setDescription={handleDescription}
            board={board}
          />
        </>
      )}
    </Container>
  );
}

export default RequestColumn;

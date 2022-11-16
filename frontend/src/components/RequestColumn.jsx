import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RequestTask from "./RequestTask";
import AddRequest from "./AddRequest";

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

const requestModel = { title: "", tasks: [], description: "" };

function RequestColumn({ column, tasks, board }) {
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
    console.log(request.tasks)

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

    const newTasks = JSON.parse(JSON.stringify(newBoard.tasks));

    Object.keys(newBoard.tasks).forEach(e => {
    
        if(!newColumn.taskIds.includes(e)){
                delete newTasks[e]
            }
    })

    setRequest((prev) => ({
      ...prev,
      description,
    }));
    console.log(newBoard)
    const payLoadBoard = {
        columnOrder: [newColumnId],
        columns: {[newColumnId]: newColumn},
        tasks: newTasks
    }
    console.log(payLoadBoard)
    saveBoard(payLoadBoard)
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

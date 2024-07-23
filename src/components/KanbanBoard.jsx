import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { demoKanbanData } from '../demoData';
import { ThemeContext } from '../App';

const KanbanBoard = () => {
  const [state, setState] = useState(demoKanbanData);
  const { theme } = useContext(ThemeContext);

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return; // Dropped outside the list
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return; // No change
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <div key={column.id} style={{ margin: '8px', flex: 1 }}>
              <h2>{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: theme === 'light' ? 'lightgrey' : '#333',
                      padding: '8px',
                      width: '100%',
                      minHeight: '500px',
                    }}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: '16px',
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: theme === 'light' ? '#fff' : '#444',
                              color: theme === 'light' ? '#000' : '#fff',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;

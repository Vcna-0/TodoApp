import React from "react";
import {Task} from "../Task/Task";
import {TaskType} from '../../types';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

type Props = {
    listTasks: TaskType[];
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    showTasks: TaskType[];
    onDragEnd: (result: any) => void;
}

export const ListTasks = ({listTasks, setListTasks, showTasks, onDragEnd}:Props) => {
  return(
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
              {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                      {showTasks.map((task, index) => (
                          <Task key={task.id} task={task} listTasks={listTasks} setListTasks={setListTasks} index={index} />
                      ))}
                      {provided.placeholder}
                  </div>
              )}
          </Droppable>
      </DragDropContext>
  )
}
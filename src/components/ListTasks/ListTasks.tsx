import {Task} from "../Task/Task";
import {TaskType} from '../../App';
import React from "react";
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

type Props = {
    listTasks: TaskType[];
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    showTasks: TaskType[];
    onDragEnd: (result: any) => void;
}

export const ListTasks = ({listTasks, setListTasks, showTasks, onDragEnd}:Props) => {
  return(
      // <DragDropContext onDragEnd={onDragEnd}>
      //     <Droppable droppableId="droppable">
      //         {(provided) => (
      //             <div ref={provided.innerRef} {...provided.droppableProps}>
      //                 {showTasks.map((task, index) => (
      //                     <Draggable key={task.id} index={index} draggableId={task.id.toString()}>
      //                         {(provided, snapshot) => (
      //                             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      //                                 <Task key={task.id} task={task} listTasks={listTasks} setListTasks={setListTasks} />
      //                             </div>
      //                         )}
      //                     </Draggable>
      //                 ))}
      //                 {provided.placeholder} {/* Ajoutez cette ligne */}
      //             </div>
      //         )}
      //     </Droppable>
      // </DragDropContext>

      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
              {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                      {showTasks.map((task, index) => (
                          <Task key={task.id} task={task} listTasks={listTasks} setListTasks={setListTasks} index={index} />
                      ))}
                      {provided.placeholder} {/* Ajoutez cette ligne */}
                  </div>
              )}
          </Droppable>
      </DragDropContext>
  )
}
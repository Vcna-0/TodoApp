import {Task} from "../Task/Task";
import {TaskType} from '../../App';
import React from "react";

type Props = {
    listTasks: TaskType[];
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    showTasks: TaskType[];
}

export const ListTasks = ({listTasks, setListTasks, showTasks}:Props) => {
  return(
      <>
          {showTasks.map((task) => (
              <Task key={ task.id } task={ task } listTasks={ listTasks } setListTasks={ setListTasks }/>
          ))}
      </>

  )
}
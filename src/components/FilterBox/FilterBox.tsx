import React, {useContext} from "react";
import { TaskType } from "../../App";
import styles from './filterBox.module.css'
import {ThemeContext} from "../../providers/ThemeContext";

type Props = {
    setShowTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    showTasks: TaskType[];
    listTasks: TaskType[];
}

export const FilterBox = ({showTasks, setShowTasks, listTasks, setListTasks}:Props) => {

    const { theme } = useContext(ThemeContext);
    const buttonTheme = theme === 'light' ? styles.buttonLight : styles.buttonDark;
    const boxContainerTheme = theme === 'light' ? styles.boxContainerLight : styles.boxContainerDark;

    const handleShowAll = () => {
        setShowTasks(listTasks)
    }
    const handleShowActive = () => {
        setShowTasks(listTasks.filter(task => !task.completed))
    }
    const handleShowCompleted = () => {
        setShowTasks(listTasks.filter(task => task.completed))
    }
    const handleClearCompleted = () => {
        setListTasks(listTasks.filter(task => !task.completed))
    }

  return(
        <div className={`${styles.boxContainer} ${boxContainerTheme}`}>
            <p>{showTasks.length} items left</p>
            <div className={styles.boxFilter}>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleShowAll }>All</button>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleShowActive }>Active</button>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleShowCompleted }>Completed</button>
            </div>
            <button className={`${styles.button} ${buttonTheme}`} onClick={ handleClearCompleted }>Clear Completed</button>
        </div>
  )
}
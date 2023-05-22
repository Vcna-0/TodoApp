import React, {useContext} from 'react';
import {TaskType} from '../../App';
import styles from './task.module.css'
import {ThemeContext} from "../../providers/ThemeContext";
import CrossIcon from '../../assets/icon-cross.svg';

type Props = {
    listTasks: TaskType[];
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    task: TaskType;
}

export const Task = ({ listTasks, setListTasks, task }:Props) => {

    const { theme } = useContext(ThemeContext);
    const taskTheme = theme === 'light' ? styles.taskLight : styles.taskDark;
    const completedTheme = theme === 'light' ? styles.completedTextLight : styles.completedTextDark;

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
        setListTasks((prevListTasks) => {
            return prevListTasks.map((prevTask) =>
                prevTask.text === name ? {...prevTask, completed: checked} : prevTask
            );
        });
    };

    const removeTask = () => {
        console.log(task.id)
        setListTasks(listTasks.filter((it) => it.id !== task.id))
    }

    return (
        <label htmlFor={ task.text } className={`${styles.taskContainer} ${taskTheme}`}>
            <div className={styles.inputCheckbox}>
                <input type="checkbox" id={ task.text } name={ task.text } checked={ task.completed } onChange={ handleCheckboxChange }/>
                <span className={`${task.completed ? completedTheme : ''} ${styles.checkboxText}`}>{task.text}</span>
            </div>
            <button className={styles.buttonRemove} onClick={ removeTask }>
                <img src={ CrossIcon } alt="cross" />
            </button>
        </label>
    );
}
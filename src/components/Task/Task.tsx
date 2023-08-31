import React, {useContext} from 'react';
import {TaskType} from '../../types';
import {ThemeContext} from "../../providers/ThemeContext";
import styles from './task.module.css'
import CrossIcon from '../../assets/icon-cross.svg';
import {Draggable} from "react-beautiful-dnd";

type Props = {
    listTasks: TaskType[];
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    task: TaskType;
    index: number;
}

export const Task = ({ listTasks, setListTasks, task, index}:Props) => {

    const { theme } = useContext(ThemeContext);
    const taskTheme = theme === 'light' ? styles.taskLight : styles.taskDark;
    const completedTheme = theme === 'light' ? styles.completedTextLight : styles.completedTextDark;
    const checkboxTheme = theme === 'light' ? styles.checkboxThemeLight : styles.checkboxThemeDark;

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
        setListTasks((prevListTasks) => {
            return prevListTasks.map((prevTask) =>
                prevTask.text === name ? {...prevTask, completed: checked} : prevTask
            );
        });
    };

    const removeTask = () => {
        setListTasks(listTasks.filter((it) => it.id !== task.id))
    }

    return (
        <Draggable key={task.id} index={index} draggableId={task.id.toString()}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <label htmlFor={ task.text } className={`${styles.taskContainer} ${taskTheme}`}>
                        <div className={styles.inputCheckbox}>
                            <input 
                                type="checkbox" 
                                className={`${checkboxTheme} ${styles.checkbox}`} 
                                id={ task.text } 
                                name={ task.text } 
                                checked={ task.completed } 
                                onChange={ handleCheckboxChange }
                            />
                            <span className={`${task.completed ? completedTheme : ''} ${styles.checkboxText}`}>{task.text}</span>
                        </div>
                        <button className={styles.buttonRemove} onClick={ removeTask }>
                            <img src={ CrossIcon } alt="cross" />
                        </button>
                    </label>
                </div>
            )}
        </Draggable>
    );
}
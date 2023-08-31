import React, {useContext, useState} from "react";
import { TaskType } from "../../types";
import styles from './filters.module.css'
import {ThemeContext} from "../../providers/ThemeContext";

type Props = {
    setShowTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    showTasks: TaskType[];
    listTasks: TaskType[];
}

export const Filters = ({showTasks, setShowTasks, listTasks, setListTasks}:Props) => {

    const { theme } = useContext(ThemeContext);
    const buttonTheme = theme === 'light' ? styles.buttonLight : styles.buttonDark;
    const boxContainerTheme = theme === 'light' ? styles.boxContainerLight : styles.boxContainerDark;
    const [activeButton, setActiveButton] = useState('all'); 


    const handleButtonClick = (buttonType:string) => {
        setActiveButton(buttonType);
    };
    
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

    return (
        <div className={styles.boxContainer}>
            <div className={`${styles.boxClear} ${boxContainerTheme}`}>
                <p>{showTasks.length} items left</p>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleClearCompleted }> Clear Completed </button>
            </div>
            <div className={`${styles.boxFilter} ${boxContainerTheme}`}>
                <button
                    className={`${styles.button} ${buttonTheme} ${activeButton === 'all' ? styles.activeButton : ''}`}
                    onClick={() => {
                        handleButtonClick('all');
                        handleShowAll(); 
                    }}
                >
                    All
                </button>
                <button
                    className={`${styles.button} ${buttonTheme} ${activeButton === 'active' ? styles.activeButton : ''}`}
                    onClick={() => {
                        handleButtonClick('active');
                        handleShowActive(); 
                    }}
                >
                    Active
                </button>
                <button
                    className={`${styles.button} ${buttonTheme} ${activeButton === 'completed' ? styles.activeButton : ''}`}
                    onClick={() => {
                        handleButtonClick('completed');
                        handleShowCompleted(); 
                    }}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}
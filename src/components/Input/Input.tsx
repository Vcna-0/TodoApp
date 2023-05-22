import React, {useContext, useState} from "react";
import { ThemeContext } from "../../providers/ThemeContext";
import styles from './input.module.css'
import { TaskType } from "../../App";

type Props = {
    listTasks:  TaskType[];
    setListTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export const Input = ({listTasks, setListTasks}:Props) => {

    const { theme } = useContext(ThemeContext);
    const inputTheme = theme === 'light' ? styles.inputLight : styles.inputDark;

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setListTasks([...listTasks, {id: listTasks.length + 1, text: inputValue, completed: false}])
        setInputValue('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className={`${styles.input} ${inputTheme}`} type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
            </form>
        </div>
    )
}
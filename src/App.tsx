import {useContext, useEffect, useState} from 'react';
import { ThemeContext } from './providers/ThemeContext';
import { Header } from "./components/Header/Header"
import { Input } from "./components/Input/Input"
import { ListTasks } from "./components/ListTasks/ListTasks"
import { Filters } from "./components/Filters/Filters";
import styles from './app.module.css'

export type TaskType = {
    id: number;
    text: string;
    completed: boolean;
};

export const App = () => {

    const { theme } = useContext(ThemeContext);
    const bgTheme = theme === 'light' ? styles.bgLight : styles.bgDark;
    const listTaskContainerTheme = theme === 'light' ? styles.listTaskContainerLight : styles.listTaskContainerDark;

    const [listTasks, setListTasks] = useState<TaskType[]>(() => {
        const storedItems = JSON.parse(localStorage.getItem('tasks') ?? 'null');
        return storedItems ?? [
            { id: 1, text: 'Complete Online JavaScript Course', completed: true },
            { id: 2, text: 'Learn React', completed: false },
            { id: 3, text: 'Jog around the park 3x', completed: false },
            { id: 4, text: '10 minutes meditation', completed: false },
            { id: 5, text: 'Read for 1 hour', completed: false },
            { id: 6, text: 'Pick up groceries', completed: false },
            { id: 7, text: 'Complete Todo App on Frontend Mentor', completed: false },
        ];
    });

    const [showTasks, setShowTasks] = useState<TaskType[]>(listTasks);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(listTasks));
    }, [listTasks]);

    useEffect(() => {
        setShowTasks(listTasks);
    }, [listTasks]);

    return (
        <div className={`${styles.appContainer} ${bgTheme}`}>
            <div className={styles.todoContainer}>
                <Header/>
                <Input listTasks={ listTasks } setListTasks={ setListTasks }/>
                <div className={`${styles.listTaskContainer} ${listTaskContainerTheme}`}>
                    <ListTasks listTasks={ listTasks } setListTasks={ setListTasks } showTasks={showTasks}/>
                    <Filters showTasks={ showTasks } setShowTasks={ setShowTasks } listTasks={listTasks} setListTasks={setListTasks}/>
                </div>
            </div>
        </div>
    )
}
import {useContext, useEffect, useState} from 'react';
import { ThemeContext } from './providers/ThemeContext';
import { Header } from "./components/Header/Header"
import { Input } from "./components/Input/Input"
import { ListTasks } from "./components/ListTasks/ListTasks"
import { Filters } from "./components/Filters/Filters";
import {TaskType, DragEndDropParams} from "./types.jsx";
import styles from './app.module.css'
import tasksData from './tasksData.json';

export const App = () => {

    const { theme } = useContext(ThemeContext);
    const bgTheme = theme === 'light' ? styles.bgLight : styles.bgDark;
    const listTaskContainerTheme = theme === 'light' ? styles.listTaskContainerLight : styles.listTaskContainerDark;

    const [listTasks, setListTasks] = useState<TaskType[]>(() => {
        const storedItems = JSON.parse(localStorage.getItem('tasks') ?? 'null');
        return storedItems ?? tasksData;
    });
    const [showTasks, setShowTasks] = useState<TaskType[]>(listTasks);

    // Drag and Drop
    const reorder = (list:TaskType[], startIndex:number, endIndex:number): TaskType[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const handleDragEnd = ({ destination, source }: DragEndDropParams) => {
        if (!destination) return;
        setListTasks(reorder(listTasks, source.index, destination.index));
    }
    // End Drag and Drop

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
                    <ListTasks listTasks={ listTasks } setListTasks={ setListTasks } showTasks={showTasks} onDragEnd={handleDragEnd}/>
                    <Filters showTasks={ showTasks } setShowTasks={ setShowTasks } listTasks={listTasks} setListTasks={setListTasks}/>
                </div>
            </div>
        </div>
    )
}
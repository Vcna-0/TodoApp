import {useContext, useEffect, useState} from 'react';
import { ThemeContext } from './providers/ThemeContext';
import { Header } from "./components/Header/Header"
import { Input } from "./components/Input/Input"
import { ListTasks } from "./components/ListTasks/ListTasks"
import { Filters } from "./components/Filters/Filters";
import styles from './app.module.css'
import tasksData from './tasksData.json';

export type TaskType = {
    id: number;
    text: string;
    completed: boolean;
};

type DragEndParams = {
    destination?: {
        droppableId: string;
        index: number;
    };
    source: {
        index: number;
    };
};

const reorder = (list:TaskType[], startIndex:number, endIndex:number): TaskType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const App = () => {

    const { theme } = useContext(ThemeContext);
    const bgTheme = theme === 'light' ? styles.bgLight : styles.bgDark;
    const listTaskContainerTheme = theme === 'light' ? styles.listTaskContainerLight : styles.listTaskContainerDark;

    const [listTasks, setListTasks] = useState<TaskType[]>(() => {
        const storedItems = JSON.parse(localStorage.getItem('tasks') ?? 'null');
        return storedItems ?? tasksData;
    });

    const [showTasks, setShowTasks] = useState<TaskType[]>(listTasks);

    const handleDragEnd = ({ destination, source }: DragEndParams) => {
        if (!destination) return;
        setListTasks(reorder(listTasks, source.index, destination.index));
    }

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
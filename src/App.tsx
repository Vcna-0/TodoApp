import {useContext, useEffect, useState} from 'react';
import { ThemeContext } from './providers/ThemeContext';
import { Header } from "./components/Header/Header"
import { Input } from "./components/Input/Input"
import { Item } from "./components/Item/Item"
import { FilterBox} from "./components/FilterBox/FilterBox";
import styles from './app.module.css'

export type ItemType = {
    id: number;
    text: string;
    completed: boolean;
};

export const App = () => {

    const { theme } = useContext(ThemeContext);
    const bgTheme = theme === 'light' ? styles.bgLight : styles.bgDark;

    const [listItems, setListItems] = useState<ItemType[]>(() => {
        const storedItems = JSON.parse(localStorage.getItem('items') ?? 'null');
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

    const [showItems, setShowItems] = useState<ItemType[]>(listItems);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(listItems));
    }, [listItems]);

    useEffect(() => {
        setShowItems(listItems);
    }, [listItems]);

    return (
        <div className={`${styles.container} ${bgTheme}`}>
            <div className={styles.todoContainer}>
                <Header/>
                <Input listItems={ listItems } setListItems={ setListItems }/>
                {showItems.map((item) => (
                    <Item key={ item.id } item={ item } setListItems={ setListItems }/>
                ))}
                <FilterBox showItems={ showItems } setShowItems={ setShowItems } listItems={listItems} setListItems={setListItems}/>
            </div>
        </div>
    )
}
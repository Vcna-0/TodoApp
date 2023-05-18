import React, {useContext, useState} from "react";
import { ThemeContext } from "../../providers/ThemeContext";
import styles from './input.module.css'
import { ItemType } from "../../App";

type Props = {
    listItems:  ItemType[];
    setListItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

export const Input = ({listItems, setListItems}:Props) => {

    const { theme } = useContext(ThemeContext);
    const inputTheme = theme === 'light' ? styles.inputLight : styles.inputDark;

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setListItems([...listItems, {id: listItems.length + 1, text: inputValue, completed: false}])
        setInputValue('');
    }
    console.log("items", listItems)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} className={`${styles.input} ${inputTheme}`}/>
            </form>
        </div>
    )
}
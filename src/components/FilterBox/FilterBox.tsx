import React, {useContext} from "react";
import {ItemType} from "../../App";
import styles from './filterBox.module.css'
import {ThemeContext} from "../../providers/ThemeContext";

type Props = {
    setShowItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
    setListItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
    showItems: ItemType[];
    listItems: ItemType[];
}

export const FilterBox = ({showItems, setShowItems, listItems, setListItems}:Props) => {

    const { theme } = useContext(ThemeContext);
    const buttonTheme = theme === 'light' ? styles.buttonLight : styles.buttonDark;

    const handleShowAll = () => {
        setShowItems(listItems)
    }
    const handleShowActive = () => {
        setShowItems(listItems.filter(item => !item.completed))
    }
    const handleShowCompleted = () => {
        setShowItems(listItems.filter(item => item.completed))
    }
    const handleClearCompleted = () => {
        setListItems(listItems.filter(item => !item.completed))
    }

  return(
        <div className={styles.boxContainer}>
            <p className={buttonTheme}>{showItems.length} items left</p>
            <div className={styles.boxFilter}>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleShowAll }>All</button>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleShowActive }>Active</button>
                <button className={`${styles.button} ${buttonTheme}`} onClick={ handleShowCompleted }>Completed</button>
            </div>
            <button className={`${styles.button} ${buttonTheme}`} onClick={ handleClearCompleted }>Clear Completed</button>
        </div>
  )
}
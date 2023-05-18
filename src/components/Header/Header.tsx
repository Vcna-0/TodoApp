import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import IconMoon from '../../assets/icon-moon.svg';
import IconSun from '../../assets/icon-sun.svg';
import styles from './header.module.css'


export const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={ styles.headerContainer }>
            <h1 className={ styles.title }>TODO</h1>
            <button onClick={ toggleTheme } className={styles.buttonTheme}>
                {theme === 'light' ?
                    <img src={ IconMoon } alt="dark"/> : <img src={ IconSun } alt="light"/>
                }
            </button>
        </div>
    )
}
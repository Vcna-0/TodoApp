import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "./providers/ThemeContext";
import {App} from './App.tsx'
import './reset.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <ThemeProvider>
    //   <React.StrictMode>
    //     <App />
    //   </React.StrictMode>
    // </ThemeProvider>

    <ThemeProvider>
        <App />
    </ThemeProvider>
)

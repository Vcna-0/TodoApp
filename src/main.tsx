import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "./providers/ThemeContext";
import {App} from './App.tsx'
import './reset.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
)

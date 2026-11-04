import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import PrinterPage from "./pages/PrinterPage.tsx";
import MonitorPage from "./pages/MonitorPage.tsx";
import printer from "./components/printer/printer.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MonitorPage />} >
                    <Route path={printer.url} element={<PrinterPage />} />
                    <Route path="*" element={<NotFoundPage />}
                />
                </Route>    
            </Routes>
        </BrowserRouter>
    )
}

export default App
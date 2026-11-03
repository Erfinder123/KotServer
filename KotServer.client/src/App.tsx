import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import PrinterPage from "./pages/PrinterPage.tsx";
import MonitorPage from "./pages/MonitorPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MonitorPage />} >
                    <Route path="/printer" element={<PrinterPage />} />
                    <Route path="*" element={<p>Страница не найдена</p>} />
                </Route>    
            </Routes>
        </BrowserRouter>
    )
}

export default App

/*
function App() {
    return (
        <main className="main">
            <BaseElement
                className={printer.className} src={printer.src} alt={printer.alt}
            />
        </main>
  );
}

export default App
*/
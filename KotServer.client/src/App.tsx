import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import MonitorPage from "./pages/MonitorPage.tsx";
import printer from "./components/printer/printer.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { lazy, Suspense } from 'react'

const PrinterPage = lazy(() => import('./pages/PrinterPage'))

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MonitorPage />} >
                    <Route path={printer.url} element={
                            <Suspense>
                                <PrinterPage />
                            </Suspense>
                        } 
                    />
                    <Route path="*" element={<NotFoundPage />}
                />
                </Route>    
            </Routes>
        </BrowserRouter>
    )
}

export default App
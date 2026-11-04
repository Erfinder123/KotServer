import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useNavigationType } from 'react-router'
import { motion } from 'motion/react'
import BaseButtonComponent from "../components/BaseButtonComponent.tsx";
import printer from "../components/printer/printer.tsx";
import monitorView from "../settings/monitorSettings.ts";

function HomePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const navigationType = useNavigationType()
    const [returning, setReturning] = useState(location.state?.monitor === false && navigationType === "PUSH")

    useEffect(() => {
        if (!returning) {
            sessionStorage.setItem('monitor', 'false')
        }
    }, [returning])
    
    return (
        <motion.div
            className="room"
            style={{
                originX: monitorView.originX,
                originY: monitorView.originY,
            }}
            initial={returning ? {
                scale: monitorView.scale,
                x: monitorView.x,
                y: monitorView.y} : false}
            animate={{
                scale: 1,
                x: '0%',
                y: '0%',
            }}
            transition={{
                duration: 1.6,
                ease: 'easeInOut',
            }}
            onAnimationComplete={() => setReturning(false)}
        >
            <BaseButtonComponent
                className={printer.className}
                src={printer.src} 
                alt={printer.alt}
                onClick={() => {if (!returning) navigate(printer.url, { state: { monitor: true } })}}
            />
        </motion.div>
    )
}

export default HomePage
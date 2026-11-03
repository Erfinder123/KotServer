import { useState } from 'react'
import { useNavigate, useLocation, useNavigationType } from 'react-router'
import { motion } from 'motion/react'
import BaseButtonComponent from "../components/BaseButtonComponent.tsx";
import printer from "../components/printer/printer.tsx";
import monitorView from "../settings/monitorSettings.ts";

function HomePage() {
    const [target, setTarget] = useState<string | undefined>(undefined)
    const navigate = useNavigate()
    const location = useLocation()
    const navigationType = useNavigationType()
    const [returning, setReturning] = useState(location.state?.monitor === false && navigationType === "PUSH")
    
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
                scale: target ? monitorView.scale : 1,
                x: target ? monitorView.x : '0%',
                y: target ? monitorView.y : '0%',
            }}
            transition={{
                duration: 1.6,
                ease: 'easeInOut',
            }}
            onAnimationComplete={() => {
                if (target) navigate(target)
                else setReturning(false)
            }}
        >
            <BaseButtonComponent
                className={printer.className}
                src={printer.src} 
                alt={printer.alt}
                onClick={() => { if (!returning && !target) setTarget(printer.url)}}
            />
        </motion.div>
    )
}

export default HomePage
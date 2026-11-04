import { Outlet, useLocation } from 'react-router'
import { useState } from "react";
import { motion } from 'motion/react'
import monitorImage from '../assets/home.png'
import monitorView from "../settings/monitorSettings.ts";
import { useNavigate } from 'react-router'

function MonitorPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [enter, setEnter] = useState(() => sessionStorage.getItem('monitor') !== 'true')

    const screen = {
        left: 31.8,
        top: 20.5,
        width: 37.2,
        height: 35.7,
    }

    const {scale, x, y, originX, originY} = monitorView
    
    const contentStyle = {
        left: `${
            originX * 100 +
            (screen.left - originX * 100) * scale +
            parseFloat(x)
        }%`,
    
        top: `${
            originY * 100 +
            (screen.top - originY * 100) * scale +
            parseFloat(y)
        }%`,
        
        width: `${screen.width * scale}%`,
        
        height: `${screen.height * scale}%`,
    }
    
    return (
        <div className="monitor">
            <motion.div
                className="monitor-background"
                style={{
                    backgroundImage: `url(${monitorImage})`,
                    originX,
                    originY,
                }}
                initial={
                    enter ? {
                    scale: 1,
                    x: '0%',
                    y: '0%',
                    } : false
                }
                animate={{
                    scale,
                    x,
                    y,
                }}
                transition={{
                    duration: 1.6,
                    ease: 'easeInOut',
                }}
                onAnimationComplete={() => {
                    sessionStorage.setItem('monitor', 'true')
                    setEnter(false)
                }}
            />
            {!enter && (
                <div 
                    className="monitor-content"
                    style={contentStyle}
                >
                    <motion.div
                        style={{ height: '100%' }}
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Outlet />
                        <button
                            onClick={() => {navigate("/", {state: { monitor: false }})}}
                        >
                            Назад
                        </button>
                    </motion.div>
                </div>
            )}
        </div>    
    )
}

export default MonitorPage
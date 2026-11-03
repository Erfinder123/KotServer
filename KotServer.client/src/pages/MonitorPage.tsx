import { Outlet, useLocation } from 'react-router'
import { motion } from 'motion/react'
import monitorImage from '../assets/home.png'
import monitorView from "../settings/monitorSettings.ts";
import { useNavigate } from 'react-router'

function MonitorPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const screen = {
        left: 31.8,
        top: 20.5,
        width: 37.2,
        height: 35.7,
    }

    const getMonitorStyle = () => {
        const {scale, x, y, originX, originY} = monitorView

        const left =
            originX * 100 +
            (screen.left - originX * 100) * scale +
            parseFloat(x)

        const top =
            originY * 100 +
            (screen.top - originY * 100) * scale +
            parseFloat(y)

        return {
            left: `${left}%`,
            top: `${top}%`,
            width: `${screen.width * scale}%`,
            height: `${screen.height * scale}%`,
        }
    }
    
    return (
        <div className="monitor">
            <motion.div
                className="monitor-background"
                style={{
                    backgroundImage: `url(${monitorImage})`,
                    ...monitorView
                }} 
            />
            <div 
                className="monitor-content"
                style={getMonitorStyle()}
            >
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                >
                    <Outlet />
                    <button
                        style={{
                            position: 'absolute',
                            color: "#EAFBFF",
                            backgroundColor: "#FF5266",
                            border: "none",
                            cursor: 'pointer',
                            right: "16px",
                            bottom: "16px",
                            borderRadius: '10px',
                            padding: "10px 16px",
                            fontSize: "1rem"
                        }}
                        onClick={() => {navigate("/", {state: { monitor: false }})}}
                    >
                        Назад
                    </button>
                </motion.div>
            </div>
        </div>    
    )
}

export default MonitorPage
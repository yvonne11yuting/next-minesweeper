import { useEffect, useState } from "react";
import { AlarmClock, Flag, RotateCcw } from "lucide-react"

interface GameInfoProps {
    remainingFlags: number;
    startTimer: boolean;
    pauseTimer: boolean;
    resetGame: () => void;
}

const GameInfo = ({
    remainingFlags,
    startTimer,
    pauseTimer,
    resetGame
}: GameInfoProps) => {
    const [recordTime, setRecordTime] = useState<number>(0);

    useEffect(() => {
        let timer: number | undefined;
        if (startTimer) {
            timer = window.setInterval(() => {
                if (!pauseTimer) {
                    setRecordTime(prev => prev + 1);
                }
            }, 1000);
        }
        if (!startTimer && !pauseTimer) { // reset timer
            setRecordTime(0);
            window.clearInterval(timer);
        }
        return () => {
            window.clearInterval(timer);
        }
    }, [startTimer, pauseTimer, recordTime]);

    return (
        <div className="flex justify-between pb-2">
            <span className="inline-flex gap-2">
                <Flag color="#dc2626" />{remainingFlags}
            </span>
            <button onClick={resetGame}>
                <RotateCcw color="#a855f7" />
            </button>
            <span className="inline-flex gap-2">
                <AlarmClock color="#f59e0b" />{recordTime}
            </span>
        </div>
    )
}

export default GameInfo
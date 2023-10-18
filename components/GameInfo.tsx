import { useEffect, useState } from "react";
import { Flag, Info, Mouse, RotateCcw, Timer } from "lucide-react"
import { GAME_CONTROL_TEXT } from "@/constants/minesweeperCostants";

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
    const [showGuide, setShowGuide] = useState<boolean>(false);

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
        <div className="flex justify-between items-baseline pb-1">
            <span className="inline-flex gap-2 w-16">
                <Flag color="#dc2626" />
                <span data-testid="GAME_FLAGS_NUM">{remainingFlags}</span>
            </span>
            <span className="inline-flex gap-2 w-20">
                <Timer color="#f59e0b" />
                <span>{recordTime}</span>
            </span>
            <button onClick={resetGame}>
                <RotateCcw color="#a855f7" />
            </button>
            <div className="relative">
                <button onClick={() => setShowGuide(!showGuide)}>
                    <Info className="text-slate-200" />
                </button>
                {
                    showGuide && (
                        <div className="absolute left-0 bottom-0 w-96 p-5 ml-6 bg-slate-100 text-slate-900 -translate-x-full translate-y-full z-10 rounded bg-opacity-80">
                            <h2 className="text-xl font-semibold text-lime-800">How To Play</h2>
                            <ul className="flex flex-col gap-2 mt-4 leading-6 text-base text-slate-700">
                                {
                                    GAME_CONTROL_TEXT.map(({ text, icon }, idx) => (
                                        <li key={idx} className="flex gap-2">
                                            <span className="flex-none text-lime-600">{
                                                icon === 'mouse' ? <Mouse /> : <Timer />
                                            }</span>
                                            <span>{text}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default GameInfo

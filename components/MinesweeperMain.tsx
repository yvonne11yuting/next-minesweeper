"use client"
import { useState } from 'react'
import Board from './Board'
import { GAME_LEVEL, LEVEL_OPTIONS, LEVEL_SETTING } from '@/constants/minesweeperConstants'

const MinesweeperMain = () => {
    const defaultLevelEasy = LEVEL_OPTIONS[0].value
    const [level, setLevel] = useState<GAME_LEVEL>(defaultLevelEasy)
    const selectedLevel = LEVEL_SETTING[level]

    const onChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(e.target.value as unknown as GAME_LEVEL)
    }

    return (
        <div className="p-2">
            <div className="mb-3">
                <select className="px-2 py-1 text-lg text-slate-800 rounded" value={level} onChange={onChangeLevel}>
                    {
                        LEVEL_OPTIONS.map(({ value, text }) => (
                            <option key={value} value={value}>{text}</option>
                        ))
                    }
                </select>
            </div>
            <Board
                level={level}
                rows={selectedLevel.rows}
                cols={selectedLevel.cols}
                totalMines={selectedLevel.totalMines}
            />
        </div>
    )
}

export default MinesweeperMain


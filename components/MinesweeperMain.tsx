"use client"
import { useState } from 'react'

import { GAME_LEVEL, LEVEL_OPTIONS, LEVEL_SETTING } from '@/constants/minesweeperConstants'

import Board from './Board'
import FlagModeBtn from './FlagModeBtn'

const MinesweeperMain = () => {
    const defaultLevelEasy = LEVEL_OPTIONS[0].value
    const [level, setLevel] = useState<GAME_LEVEL>(defaultLevelEasy)
    const [flagMode, setFlagMode] = useState<boolean>(false) // Flag mode only for mobile devices
    const selectedLevel = LEVEL_SETTING[level]

    const onChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(e.target.value as unknown as GAME_LEVEL)
    }

    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-4">
                <select className="flex-none px-2 py-1 text-base text-slate-800 rounded" value={level} onChange={onChangeLevel} aria-label="level">
                    {
                        LEVEL_OPTIONS.map(({ value, text }) => (
                            <option key={value} value={value} aria-selected={level === value}>{text}</option>
                        ))
                    }
                </select>
                <FlagModeBtn flagMode={flagMode} setFlagMode={setFlagMode} />
            </div>
            <Board
                level={level}
                rows={selectedLevel.rows}
                cols={selectedLevel.cols}
                totalMines={selectedLevel.totalMines}
                flagMode={flagMode}
            />
        </div>
    )
}

export default MinesweeperMain


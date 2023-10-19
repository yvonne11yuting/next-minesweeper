import { Flag } from 'lucide-react'

interface FlagModeBtnProps {
    flagMode: boolean;
    setFlagMode: (flagMode: boolean) => void;
}

const FlagModeBtn = ({
    flagMode,
    setFlagMode
}: FlagModeBtnProps) => {
    return (
        <div className="mt-2 text-right block lg:hidden">
            <button
                data-testid="FLAG_MODE_BTN"
                onClick={() => setFlagMode(!flagMode)}
                aria-pressed={flagMode}
                className={`p-3 border-2 border-red-300 rounded ${flagMode ? 'bg-red-300' : ''}`}
            >
                <Flag color="#dc2626" size="1.75rem" />
            </button>
        </div>
    )
}

export default FlagModeBtn
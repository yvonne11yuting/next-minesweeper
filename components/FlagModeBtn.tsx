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
        <div className="mt-2 block lg:hidden">
            <button
                data-testid="FLAG_MODE_BTN"
                onClick={() => setFlagMode(!flagMode)}
                aria-pressed={flagMode}
                className={`p-3 rounded-full ${flagMode ? 'bg-red-300' : 'bg-red-100'}`}
            >
                <Flag color="#dc2626" size="1.5rem" />
            </button>
        </div>
    )
}

export default FlagModeBtn
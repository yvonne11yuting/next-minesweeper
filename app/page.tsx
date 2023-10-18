import MinesweeperMain from "@/components/MinesweeperMain";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[100dvh] h-screen">
      <h1 className="p-5 sm:p-10 text-2xl sm:text-4xl font-bold">Minesweeper</h1>
      <MinesweeperMain />
    </div>
  )
}

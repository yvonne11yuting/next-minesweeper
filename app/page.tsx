import MinesweeperMain from "@/components/MinesweeperMain";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[100dvh] h-screen">
      <h1 className="pt-8 pb-5 text-4xl font-bold hidden sm:block">Minesweeper</h1>
      <MinesweeperMain />
    </div>
  )
}

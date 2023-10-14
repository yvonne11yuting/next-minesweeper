import Minesweeper from "@/components/Minesweeper";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen h-[100dvh]">
      <h1 className="p-5 sm:p-10 text-2xl sm:text-4xl">Minesweeper</h1>
      <Minesweeper />
    </div>
  )
}

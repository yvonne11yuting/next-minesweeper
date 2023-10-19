# Minesweeper
Minesweeper is a classic puzzle game in which the player is presented with a grid of squares. The objective is to uncover all the squares on the grid without detonating any of the hidden mines.

<p align="center">
  <img width="300" alt="Screenshot 2023-10-19 at 1 27 56 PM" src="https://github.com/yvonne11yuting/next-minesweeper/assets/42829087/423e115a-a15d-4fb1-bd7e-c6280e44f2e7">
</p>

## Tech Stack
![nextjs](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Demo Site
[Minesweeper](https://next-minesweeper-gules.vercel.app/)

## Getting Started
### Prerequisites
Node.js (v.18.13.0)

### Installation
Clone this repo
```sh
git@github.com:yvonne11yuting/next-minesweeper.git
```

Install packages
```bash
pnpm install
# or
yarn install
# or
npm install
```

Run the development server
```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. Then, you can play the game!

### Game Control Instructions
- Left-click a square to reveal it.
- Right-click a square to flag it.
- Double-click the left mouse button on a numbered square if the number of flagged squares around it matches the number.
- \[Mobile\] You can set flags on mobile by clicking the flag button in the top right corner.
- There's a timer to record how quickly you complete the game.

## Documentation
- [flowcharts](/docs/flow.md)

/*
  Warnings:

  - You are about to drop the `bet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "bet";

-- DropTable
DROP TABLE "game";

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeTeamName" TEXT NOT NULL,
    "awayTeamName" TEXT NOT NULL,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeTeamScore" INTEGER NOT NULL,
    "awayTeamScore" INTEGER NOT NULL,
    "amountBet" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "amountWon" INTEGER NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

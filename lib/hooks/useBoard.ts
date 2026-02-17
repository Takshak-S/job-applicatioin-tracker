"use client";

import { useState } from "react";
import { Board } from "../models/models.type";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState(board?.columns || []);
  const [error, setError] = useState<string | null>(null);

  async function moveJob(jobApplicationId: string, newColumnId: string, newOrder: number ) {

  }

  return { board, columns, error ,moveJob};
}

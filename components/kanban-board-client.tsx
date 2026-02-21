"use client";

import { Board } from "@/lib/models/models.type";
import { useEffect, useState } from "react";
import KanbanBoard from "./kanban-board";

interface KanbanBoardClientProps {
  board: Board;
  userId: string;
}

/**
 * Client-side wrapper for KanbanBoard to prevent hydration mismatch
 * The dnd-kit library generates IDs that differ between server and client
 * This wrapper ensures the board only renders on the client side
 */
export default function KanbanBoardClient({
  board,
  userId,
}: KanbanBoardClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return <div className="min-h-[400px]" />;
  }

  return <KanbanBoard board={board} userId={userId} />;
}

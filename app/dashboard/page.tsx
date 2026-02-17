import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import KanbanBoard from "@/components/kanban-board";
import { Suspense } from "react";
import board from "@/lib/models/board";

async function getBoard(userId: string) {
  "use cache";
  await connectDB();
  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  const board = boardDoc ? boardDoc.toObject() : null;
  return board;
}

async function DashboardPageWrapper() {
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");
  if (!session) {
    redirect("/sign-in");
  }

  console.log(board);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board?.name}</h1>
          <p className="text-gray-600">Track your job applications </p>
        </div>
        <KanbanBoard
          board={board}
          userId={session.user.id}
        />
      </div>
    </div>
  );
}

export default async function Dashboard() {
    return <Suspense fallback={<p>Loading...</p>}><DashboardPageWrapper/></Suspense>
}

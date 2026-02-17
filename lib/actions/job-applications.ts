"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
  notes?: string;
  columnId: string;
  boardId: string;
}

export async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const {
    company,
    position,
    salary,
    jobUrl,
    tags,
    description,
    notes,
    columnId,
    boardId,
    location,
  } = data;

  if (!company || !position || !boardId || !columnId) {
    return { error: "Missing required fields" };
  }
  //Verify board ownership
  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  //Verify column belongs to board
  const column = await Column.findOne({
    _id: columnId,
    boardId: boardId,
  });
  if (!column) {
    return { error: "Column Not Found" };
  }
  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    position,
    salary,
    jobUrl,
    tags: tags || [],
    description,
    notes,
    location,
    columnId,
    userId: session.user.id,
    boardId,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath("/dashboard");
  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}

export async function updateJobApplication(
  id: string,
  updates: {
    company?: string;
    position?: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  },
) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  if (jobApplication.userId.toString() !== session.user.id) {
    return { error: "Unauthorized" };
  }

  const {columnId,order,...otherUpdates} = updates

  const updatesToApply: Partial<{
    company?: string;
    position?: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  }> = otherUpdates

  const currentColumnId = jobApplication.columnId.toString();
  const newColumnId = columnId?.toString() || currentColumnId;

  const isMovingToDifferentColumn = newColumnId && newColumnId !== currentColumnId;

  if (isMovingToDifferentColumn) {
    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: { jobApplications: id },
    })

    const jobsInTargetColumn = await JobApplication.find({ columnId: newColumnId }).sort({ order: 1 });
  }
}



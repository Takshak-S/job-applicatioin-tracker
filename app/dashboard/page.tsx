import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import board from "@/lib/models/board";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getSession();

    if(!session) {
        redirect("/sign-in");
    }

    await connectDB();

    const board=await Board.findOne({
        userId: session.user.id,
        name: "Job Hunt",
    });

    console.log(board);

    return (
        <div>
            <div>
                <div>
                    <h1>{board?.name}</h1>
                </div>
            </div>
        </div>
    )

}
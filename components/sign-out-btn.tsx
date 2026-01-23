"use-client";

import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
    const router=useRouter();
    return (
        <DropdownMenuItem className="hover:bg-primary/90" onClick={async ()=>{
            const result=await signOut()
            if(result.data) {
                router.push('/sign-in');
            } else {
                alert("Failed to sign out. Please try again.");
            }
        }}>
            Log Out
        </DropdownMenuItem>
    )
}
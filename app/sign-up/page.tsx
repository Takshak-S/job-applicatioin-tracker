"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  Link  from "next/link";
import { useState } from "react";
import { signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";


export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router=useRouter();

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signUp.email({
                name,
                email,
                password,
            });

            if(result.error) {
                setError(result.error.message??"Failed to Sign Up");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black">Sign Up</CardTitle>
                    <CardDescription className="text-gray-600">
                        Create an account to start tracking your job applications.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input 
                            id="name" 
                            type="text" 
                            placeholder="John Doe" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input 
                            id="password" 
                            type="password" 
                            placeholder="John Doe" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?
                            <Link className="font-medium text-primary hover:underline" href="/sign-in"> Sign In</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
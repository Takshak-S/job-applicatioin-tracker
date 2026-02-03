"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {Textarea} from "./ui/textarea"
import { useState } from "react";

interface CreateJobApplicationDialogProps {
    columnId:string;
    boardId:string;
}

export default function CreateJobApplicationDialog({columnId,boardId}:CreateJobApplicationDialogProps) {
    const [open,setOpen] = useState<boolean>(false)
    const [formData,setFormData]=useState({
        company:"",
        position:"",
        location:"",
        salary:"",
        jobUrl:"",
        tags:"",
        description:"",
        notes:""
    })

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        try {
            
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50" variant="outline">
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Job
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Add Job Application
                    </DialogTitle>
                    <DialogDescription>
                        Track a new job application
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div  className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="company">Company *</label>
                                <Input id="company" value={formData.company} required onChange={(e)=>setFormData({...formData,company:e.target.value})}/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="position">Position *</label>
                                <Input id="position" value={formData.position} required onChange={(e)=>setFormData({...formData,position:e.target.value})}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="location">Location</label>
                                <Input id="location" value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})}/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="salary">Salary</label>
                                <Input id="salary" value={formData.salary} onChange={(e)=>setFormData({...formData,salary:e.target.value})}/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="job-url">Job URL</label>
                            <Input id="job-url" value={formData.jobUrl} onChange={(e)=>setFormData({...formData,jobUrl:e.target.value})}/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="tags">Tags (comma-separated)</label>
                            <Input id="tags" value={formData.tags} onChange={(e)=>setFormData({...formData,tags:e.target.value})}/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Description</label>
                            <Textarea id="description" value={formData.description} rows={3} placeholder="Brief description of the role.." onChange={(e)=>setFormData({...formData,description:e.target.value})}/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes">Notes</label>
                            <Textarea id="notes" value={formData.notes} rows={4} onChange={(e)=>setFormData({...formData,notes:e.target.value})}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant={"outline"} onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Application</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
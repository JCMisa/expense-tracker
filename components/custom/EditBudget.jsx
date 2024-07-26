"use client"

import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Input } from '../ui/input';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({ budgetInfo, refreshData }) => {
    const { user } = useUser();
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo?.icon)
            setAmount(budgetInfo?.amount)
            setName(budgetInfo?.name)
        }
    }, [budgetInfo])

    const onUpdateBudget = async () => {
        try {
            const result = await db.update(Budgets)
                .set({
                    name: name,
                    amount: amount,
                    icon: emojiIcon
                })
                .where(eq(Budgets?.id, budgetInfo?.id))

            if (result) {
                refreshData()
                toast(
                    <p className="text-sm font-bold text-green-500">Budget Updated Successfully</p>
                )
            }
        } catch (error) {
            toast(
                <p className="text-sm font-bold text-red-500">Internal error occured while updating the budget</p>
            )
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild className="hidden sm:flex">
                    <Button className="flex gap-2 min-w-40 bg-yellow-500 hover:bg-yellow-600">
                        <PenBox /> Edit
                    </Button>
                </DialogTrigger>
                <DialogTrigger asChild className="block sm:hidden">
                    <div className="flex float-end justify-center sm:hidden w-14 h-14 items-center rounded-full bg-primary cursor-pointer">
                        <h2 className="text-3xl">+</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Existing Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5 flex flex-row items-center">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </Button>
                                <h2 className="ml-3 font-medium text-light">Select Emoji</h2>
                                <div className="absolute ml-24 z-20">
                                    <EmojiPicker
                                        open={openEmojiPicker}
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e?.emoji);
                                            setOpenEmojiPicker(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <h2 className="text-light font-medium my-1">Budget Name</h2>
                                <Input
                                    defaultValue={budgetInfo?.name}
                                    required
                                    placeholder="e.g School Allowance"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mt-5">
                                <h2 className="text-light font-medium my-1">Budget Amount</h2>
                                <Input
                                    defaultValue={budgetInfo?.amount}
                                    required
                                    type="number"
                                    placeholder="e.g $500"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                onClick={() => onUpdateBudget()}
                                className="mt-5 w-full"
                                disabled={!(name && amount)}
                            >
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget
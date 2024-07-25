"use client";

import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { db } from "@/utils/db";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudget = () => {
  const { user } = useUser();
  const [emojiIcon, setEmojiIcon] = useState("💸");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const onCreateBudget = async () => {
    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets?.id });

      if (result) {
        console.log("created budget id: ", result.insertedId);
        toast(
          <p className="text-sm font-bold text-green-500">New Budget Created</p>
        );
      }
    } catch (error) {
      console.log(error);
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while creating the budget
        </p>
      );
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className="hidden sm:flex">
          <div className="bg-primary min-h-[100px] p-10 rounded-md items-center flex flex-col cursor-pointer hover:shadow-md transition-all">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogTrigger asChild className="block sm:hidden">
          <div className="flex justify-center sm:hidden absolute bottom-3 right-3 w-14 h-14 items-center rounded-full bg-primary cursor-pointer">
            <h2 className="text-3xl">+</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                <div className="absolute ml-24">
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
                  required
                  placeholder="e.g School Allowance"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <h2 className="text-light font-medium my-1">Budget Amount</h2>
                <Input
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
                onClick={() => onCreateBudget()}
                className="mt-5 w-full"
                disabled={!(name && amount)}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;

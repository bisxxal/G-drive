"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import { useRouter } from "next/navigation";
import { sendEmailOTP, verifySecret } from "@/actions/user.actions";
import { RxCross2 } from "react-icons/rx";
import { PiSpinner } from "react-icons/pi";
const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({ accountId, password });

    try {
      const sessionId = await verifySecret({ accountId, password });

      console.log({ sessionId });

      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP( email );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-[#ffffff11] backdrop-blur-[10px] text-white border-2 border-[#ffffff1e]">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center cursor-pointer">Enter Your OTP
            <RxCross2  onClick={() => setIsOpen(false)} />
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-center text-gray-100">
            We&apos;ve sent a code to
            <span className="pl-1 brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="w-full justify-center flex ">
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="flex gap-4 !border-none ">
            <InputOTPSlot index={0} className="!border-2 border-[#ffffff4a] bg-[#1a1a1a34]" />
            <InputOTPSlot index={1} className="!border-2 border-[#ffffff4a] bg-[#1a1a1a34]" />
            <InputOTPSlot index={2} className="!border-2 border-[#ffffff4a] bg-[#1a1a1a34]" />
            <InputOTPSlot index={3} className="!border-2 border-[#ffffff4a] bg-[#1a1a1a34]" />
            <InputOTPSlot index={4} className="!border-2 border-[#ffffff4a] bg-[#1a1a1a34]" />
            <InputOTPSlot index={5} className="!border-2 border-[#ffffff4a] bg-[#1a1a1a34]" />
          </InputOTPGroup>
        </InputOTP>

        </div>
        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="bg-[#4bf378] h-12"
              type="button"
            >
              Submit
              {isLoading && (
                 <PiSpinner className="animate-spin" /> 
              )}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn&apos;t get a code?
              <Button type="button" variant="link" className="pl-1 brand" onClick={handleResendOtp}>
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
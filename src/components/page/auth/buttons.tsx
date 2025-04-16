"use client"

import AuthDialog from "@/components/shared/dialog/auth";
import RegisterForm from "./register-form";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthButtons() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [openDialog, setOpenDialog] = useState<"signin" | "signup" | null>(null);


  const clearParams = () => {
    console.log("CLEAR")
    const params = new URLSearchParams(window.location.search)
    params.delete("authDialog")
    const query = params.toString()
    const newUrl = query ? `?${query}` : "/"
    router.push(newUrl)
  }

  useEffect(() => {
    const dialogParam = searchParams.get("authDialog");
    if (dialogParam === "signin" || dialogParam === "signup") {
      setOpenDialog(dialogParam);
    }

    if (!openDialog) {
      console.log("CLEARNING")
      clearParams()
    }

  }, [searchParams])

  return (
    <>
      <AuthDialog title='Sign In' description='Rate My Universitas Brawijaya Professors is designed for and targeted to Universitas Brawijaya students and not governed by official state' open={openDialog === "signin"} onOpenChange={(isOpen) => setOpenDialog(isOpen ? "signin" : null)} onClick={() => setOpenDialog("signin")}>
        <RegisterForm />
      </AuthDialog>
      <AuthDialog title='Sign Up' description='Rate My Universitas Brawijaya Professors is designed for and targeted to Universitas Brawijaya students and not governed by official state' open={openDialog === "signup"} onOpenChange={(isOpen) => setOpenDialog(isOpen ? "signup" : null)} onClick={() => setOpenDialog("signup")}>
        <RegisterForm onSwitch={() => setOpenDialog("signin")}/>
      </AuthDialog>
    </>
  )
}
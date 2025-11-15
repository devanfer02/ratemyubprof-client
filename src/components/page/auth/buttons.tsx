"use client"

import AuthDialog from "@/components/shared/dialog/auth";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function AuthButtonUI() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { status } = useSession();

  const [openDialog, setOpenDialog] = useState<"signin" | "signup" | null>(null);


  const clearParams = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete("authDialog")
    const query = params.toString()
    const newUrl = query ? `?${query}` : "/"
    router.push(newUrl)
  }

  const logout = async () => {
    await signOut({ redirect: true })
  }

  useEffect(() => {
    const dialogParam = searchParams.get("authDialog");
    if (dialogParam === "signin" || dialogParam === "signup") {
      setOpenDialog(dialogParam);
    }

    if (!openDialog && dialogParam) {
      clearParams()
    }

  }, [searchParams])

  if (status === "loading") {
    return (
      <Skeleton className="h-9 w-22 rounded-md bg-zinc-300" />
    )
  }

  if (status === "authenticated") {
    return <Button className="bg-ub-secondary text-white hover:bg-white hover:text-ub-secondary" onClick={() => logout()}>Sign out</Button>
  }

  return (
    <>
      <AuthDialog title='Sign In' description='Rate My Universitas Brawijaya Professors is designed for and targeted to Universitas Brawijaya students and not governed by official state' open={openDialog === "signin"} onOpenChange={(isOpen) => setOpenDialog(isOpen ? "signin" : null)} onClick={() => setOpenDialog("signin")}>
        <LoginForm onSwitch={() => setOpenDialog("signup")}/>
      </AuthDialog>
      <AuthDialog title='Sign Up' description='Rate My Universitas Brawijaya Professors is designed for and targeted to Universitas Brawijaya students and not governed by official state' open={openDialog === "signup"} onOpenChange={(isOpen) => setOpenDialog(isOpen ? "signup" : null)} onClick={() => setOpenDialog("signup")}>
        <RegisterForm onSwitch={() => setOpenDialog("signin")}/>
      </AuthDialog>
    </>
  )
}

export default function AuthButtons() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthButtonUI/>
    </Suspense>
  )
}
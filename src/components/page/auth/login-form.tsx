"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormData } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterFormProps = {
  onSwitch?: () => void 
}

export default function LoginForm({onSwitch}: RegisterFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const [err, setError] = useState<Error | null>(null)
  const [isLoading, setLoading] = useState(false)

  const loginHandler = async (data: LoginFormData) => {
    try {
      setError(null)
      setLoading(true)

      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: true,
      })

      setLoading(false) 

      if (res?.status === 401) {
        setError(new Error("Invalid username or password"))
        return
      }

      if (res?.status === 500) {
        setError(new Error(res?.error || "An error occurred while logging in"))
      }


    } catch (err) {
      setError(err as Error)
      
    }
  }

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(loginHandler)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input
          id="username"
          placeholder="Username"
          className="col-span-3"
          required
          {...register("username", {required: true})}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          id="password"
          placeholder="Password"
          className="col-span-3"
          type="password"
          required
          {...register("password", {required: true})}
          />
      </div>
      <Button className="rounded-lg bg-ub-secondary hover:bg-white border border-ub-secondary hover:text-ub-secondary" disabled={isLoading}>
        { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        { isLoading ? "Loading..." : "Continue" }
      </Button>

      {err && (
        <div className="text-red-500 text-sm text-center">
          {err.message}
        </div>
      )}

      <div className="text-sm text-center">
        Don't have an account?{" "}
        <Button variant="link" onClick={onSwitch} className="text-ub-secondary">
          Sign Up
        </Button>
      </div>
    </form>
  )
}
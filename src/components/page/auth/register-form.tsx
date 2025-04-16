"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/auth";
import { RegisterFormData } from "@/types/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterFormProps = {
  onSwitch?: () => void 
}

export default function RegisterForm({onSwitch}: RegisterFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()
  const [err, setError] = useState<Error | null>(null)

  const registerHandler = async (data: RegisterFormData) => {

    const err = await registerUser(data)
    
    if (err != null) {
      setError(err)
      return 
    }

    window.location.href = "?authDialog=signin";
  }

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(registerHandler)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="nim" className="text-right">
          NIM
        </Label>
        <Input
          id="nim"
          placeholder="Your Brawijaya NIM"
          className="col-span-3"
          required
          {...register("nim", {required: true})}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          id="password"
          placeholder="Your Brawijaya Password"
          className="col-span-3"
          type="password"
          required
          {...register("password", {required: true})}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          New Username
        </Label>
        <Input
          id="username"
          placeholder="New Account Username"
          className="col-span-3"
          required
          {...register("username", {required: true})}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="newPassword" className="text-right">
          New Password
        </Label>
        <Input
          id="newPassword"
          placeholder="New Account Password"
          className="col-span-3"
          type="password"
          required
          {...register("newPassword", {required: true, minLength: { value: 6, message: "New password must be minimum 6 characters" }})}
          />
      </div>
      { errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span> }
      <Button className="rounded-lg">Continue</Button>

      {err && (
        <div className="text-red-500 text-sm text-center">
          {err.message}
        </div>
      )}

      <div className="text-sm text-center">
        Already have an account?{" "}
        <Button variant="link" onClick={onSwitch}>
          Sign In 
        </Button>
      </div>
    </form>
  )
}
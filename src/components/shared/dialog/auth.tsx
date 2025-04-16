import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import React from "react"

type AuthDialogProps = {
  title: string
  description: string
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onClick?: () => void
}

export default function AuthDialog(
  {
    title,
    description,
    children,
    open,
    onClick,
    onOpenChange
  }: AuthDialogProps
) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={onClick}>{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogDescription className="text-center">
          {description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

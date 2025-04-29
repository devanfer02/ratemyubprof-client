"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createReview } from "@/services/review"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ProfessorIDCard from "../professors/id-card"
import Image from "next/image"
import RatingStar from "@/components/shared/input/rate-star"

type ReviewFormParams = {
  professor: Professor
}

type ApiState = {
  isLoading: boolean;
  error: Error | null;
}

export default function ReviewForm({ professor }: ReviewFormParams) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>()
  const [hoveredDiffIndex, setHoveredDiffIndex] = useState<number>(0)
  const [hoveredFriendIndex, setHoveredFriendIndex] = useState<number>(0)
  const [apiState, setApiState] = useState<ApiState>({ isLoading: false, error: null } as ApiState)
  const diffRate = watch("diffRate", 0)
  const friendlyRate = watch("friendlyRate", 0)

  const submitHandler = async (data: ReviewFormData) => {
    setApiState({ isLoading: true, error: null })

    const err = await createReview(professor.id, data)

    if (err != null) {
      setApiState({ isLoading: false, error: err })
      return
    }
    setApiState({ isLoading: false, error: null })
  }

  return (
    <Card className="p-10 m-10 ">
      <div className="lg:flex space-x-4">
        <div className="lg:w-2/3 lg:ml-5 mt-5 lg:mt-0">
          <div>
            <h1 className="text-xl lg:text-3xl font-bold">
              <a href={`/professors/${professor.id}`} className="hover:underline hover:decoration-ub-secondary">
                {professor.name}
              </a>
            </h1>
            <p className="text-sm text-gray-500">{professor.faculty} · {professor.major}</p>
          </div>
          <hr />
          <form className="mt-5" onSubmit={handleSubmit(submitHandler)}>
            <div className="my-5">
              <p>How would you rate the difficulty of the professor’s class?</p>
              <div className="flex flex-row mt-2">
                <RatingStar
                  rate={diffRate}
                  hoveredIndex={hoveredDiffIndex}
                  setHoveredIndex={setHoveredDiffIndex}
                  onClick={index => {
                    const newDiffRate = index === getValues('diffRate') ? 0 : index;
                    setValue("diffRate", newDiffRate);
                    setHoveredDiffIndex(newDiffRate);
                  }}
                />
                <Input type="hidden" {...register("diffRate", { required: true })} />
              </div>
            </div>
            <div className="my-5">
              <p>How would you rate the professor's friendliness in class?</p>
              <div className="flex flex-row mt-2">
                <RatingStar
                  rate={friendlyRate}
                  hoveredIndex={hoveredFriendIndex}
                  setHoveredIndex={setHoveredFriendIndex}
                  onClick={index => {
                    const newFriendRate = index === getValues('friendlyRate') ? 0 : index;
                    setValue("friendlyRate", newFriendRate);
                    setHoveredFriendIndex(newFriendRate);
                  }}
                />
                <Input type="hidden" {...register("friendlyRate", { required: true })} />
              </div>
            </div>
            <div className="">
              <p>Tell us about your experience with this professor</p>
              <Textarea {...register("comment")} className="resize-none mt-2" rows={10} />
            </div>
            <div className="my-5">
              <Button className="rounded-lg bg-ub-secondary hover:bg-white border border-ub-secondary hover:text-ub-secondary w-full" disabled={apiState.isLoading}>
                {apiState.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {apiState.isLoading ? "Loading..." : "Submit your review!"}
              </Button>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <Image
            src={professor.profileImgLink}
            alt={professor.name}
            className="w-full h-[500px] object-cover"
            width={100}
            height={100}
          />
        </div>
      </div>
    </Card>
  )
}
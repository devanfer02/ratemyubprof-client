"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createReview } from "@/services/review"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import RatingStar from "@/components/shared/input/rate-star"
import { redirect } from "next/navigation"
import { isBadWord } from "@/lib/string"

type ReviewFormParams = {
  professor: Professor
}

type ApiState = {
  isLoading: boolean;
  error: Error | null;
}

function testBadWord(value: string): boolean | string {
  const check = isBadWord(value)

  if (check) {
    return "Submitted comment containt harsh words"
  }

  return true 
}


export default function ReviewForm({ professor }: ReviewFormParams) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    mode: "onChange"
  })
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
    redirect(`/professors/${professor.id}`)
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
              <p>How would you rate the difficulty of the professor's class?</p>
              <p className="text-sm text-gray-500">
                e.g., project workload, assignment, subject difficulty, overall workload
              </p>
              <div className="flex flex-row mt-2">
                <RatingStar
                  rateName="difficultyRate"
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
              <p className="text-sm text-gray-500">
                e.g., approachability, responsiveness, helpfulness, positive attitude
              </p>
              <div className="flex flex-row mt-2">
                <RatingStar
                  rateName="friendlyRate"
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
              <Textarea {...register("comment", { required: true, validate: testBadWord })} className="border border-ub-primary bg-gray-100 resize-none mt-2" rows={10} required />
              {errors.comment && (
                <p className="text-red-500 text-sm">{errors.comment.message}</p>
              )}
            </div>
            <div className="my-5">
              <Button className="rounded-lg bg-ub-secondary hover:bg-white border border-ub-secondary hover:text-ub-secondary w-full py-5 my-3" disabled={apiState.isLoading}>
                {apiState.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {apiState.isLoading ? "Loading..." : "SUBMIT YOUR REVIEW!"}
              </Button>
              <Button className="rounded-lg bg-ub-primary hover:bg-white border border-ub-primary hover:text-ub-primary w-full py-5">
                Cancel
              </Button>
              {apiState.error && (
                <p className="text-red-500">An error occured when trying to create review!</p>
              )}
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
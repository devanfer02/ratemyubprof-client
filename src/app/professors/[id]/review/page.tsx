import ReviewForm from "@/components/page/review/review-form";
import { fetchProfessorById } from "@/services/professor";
import Image from "next/image";

type ReviewProfessorParams = Promise<{ id: string }>;

export default async function ReviewProfessor(props: { params: ReviewProfessorParams }) {
  const { id } = await props.params

  const [professor, _, profErr] = await fetchProfessorById(id);
  
  if (profErr) {
    return (
      <div className="h-screen flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image src="/assets/panic.jpg" width={500} height={500} alt="panic" />
          <h1 className="text-2xl font-bold text-ub-secondary">An error occured!</h1>
        </div>
      </div>
    )
  }

  if (professor === null) {
    return (
      <div className="h-screen flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">Your professor is not here 😔</h1>
          <p className="text-gray-600 mt-2">Try looking for another to vent out your frustation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ReviewForm professor={professor}/>
    </div>
  )
}
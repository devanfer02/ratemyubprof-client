import ProfessorIDCard from "@/components/page/professors/id-card"
import ReviewSection from "@/components/page/professors/review-section"
import DistributionCard from "@/components/shared/card/distribution-card"
import { fetchProfessorById } from "@/services/professor"
import Image from "next/image"

type ProfessorReviewParams = Promise<{ id: string }>;

export default async function ProfessorReviewPage(props: { params: ProfessorReviewParams }) {
  const { id } = await props.params
  
  const [professor, profMeta, profErr] = await fetchProfessorById(id);
  
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
    <div className="p-10 space-y-4 min-h-screen">
      <ProfessorIDCard professor={professor}/>
      <div className="grid lg:grid-cols-2 gap-4">
        <DistributionCard meta={profMeta!.difficultyDistribution} name="Difficulty Rating Distribution" />
        <DistributionCard meta={profMeta!.friendlyDistribution} name="Friendly Rating Distribution" />
      </div>
      <div>
        <ReviewSection professorId={professor.id} />
      </div>
    </div>
  );
}
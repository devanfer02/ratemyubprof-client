import ReviewSection from "@/components/page/professors/review-section"
import DistributionCard from "@/components/shared/card/distribution-card"
import ReviewCard from "@/components/shared/card/review-card"
import { Card } from "@/components/ui/card"
import { fetchProfessorById } from "@/services/professor"
import { fetchReviewByProfessorId } from "@/services/review"
import Image from "next/image"

type ProfessorReviewPageProps = {
  params: {
    id: string
  }
}

export default async function ProfessorReviewPage({ params }: ProfessorReviewPageProps) {
  const { id } = await params
  
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
      <Card className="px-10 border border-ub-primary">
        <div className="lg:flex items-center space-x-4">
          <Image src={professor.profileImgLink} alt={professor.name} className="w-50" width={100} height={100} />
          <div className="lg:w-2/3 lg:ml-5 mt-5 lg:mt-0">
            <h1 className="text-xl lg:text-3xl font-bold">{professor.name}</h1>
            <p className="text-sm text-gray-500">{professor.faculty} · {professor.major}</p>
            <div className="mt-5 flex">
              <div className="">
                <h2 className="font-semibold text-sm lg:text-xl">Total Reviews</h2>
                <p className="text-xl lg:text-4xl font-bold">{professor.reviewsCount}</p>
              </div>
              <div className="mx-5"></div>
              <div className="">
                <h2 className="font-semibold text-sm lg:text-xl">Average Difficulty</h2>
                <p className="text-xl lg:text-4xl font-bold">{professor.avgDiffRate.toFixed(1)} / 5</p>
              </div>
              <div className="mx-5">
              </div>
              <div className="">
                <h2 className="font-semibold text-sm lg:text-xl">Average Friendliness</h2>
                <p className="text-xl lg:text-4xl font-bold">{professor.avgFriendlyRate.toFixed(1)} / 5</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
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
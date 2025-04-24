import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type ProfessorIDCardProps = {
  professor: Professor
}

export default function ProfessorIDCard({professor}: ProfessorIDCardProps) {
  return (
    <Card className="px-10 border border-ub-primary">
      <div className="lg:flex items-center space-x-4">
        <Image src={professor.profileImgLink} alt={professor.name} className="w-50" width={100} height={100} />
        <div className="lg:w-2/3 lg:ml-5 mt-5 lg:mt-0">
          <h1 className="text-xl lg:text-3xl font-bold">
            <a href={`/professors/${professor.id}`} className="hover:underline hover:decoration-ub-secondary">
              {professor.name}
            </a>
          </h1>
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
          <Button className="mt-5 bg-ub-secondary text-white border border-ub-secondary hover:bg-white hover:text-ub-secondary">
            <a href={`/professors/${professor.id}/review`}>Rate this professor!</a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
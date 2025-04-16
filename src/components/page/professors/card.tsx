import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

type ProfessorCardProps = {
  prof: Professor;
};

export default function ProfessorCard({ prof }: ProfessorCardProps) {
  return (
    <Card className="flex flex-row rounded-lg shadow-lg p-4 bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0">
        <Image
          src={prof.profileImgLink || "https://www.gravatar.com/avatar/?d=mp"}
          width={100}
          height={100}
          alt={prof.name}
          className="object-cover"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto text-sm text-left text-gray-700 w-full border-collapse">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold">Name</td>
              <td className="px-4 py-2">{prof.name}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Fakultas</td>
              <td className="px-4 py-2">{prof.faculty}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Jurusan</td>
              <td className="px-4 py-2">{prof.major}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Total Reviews</td>
              <td className="px-4 py-2">{prof.reviewsCount}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Difficulty Rate</td>
              <td className="px-4 py-2">{prof.avgDiffRate} / 5</td>

            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Friendly Rate</td>
              <td className="px-4 py-2">{prof.avgFriendlyRate} / 5</td>

            </tr>
          </tbody>
        </table>

        <div className="pl-4">
          <Progress value={prof.avgDiffRate / 5 * 100} className="[&>*]:bg-ub-primary my-2" />
          <Progress value={prof.avgFriendlyRate / 5 * 100} className="[&>*]:bg-ub-secondary my-2"/>
        </div>
      </div>

    </Card>
  );
}

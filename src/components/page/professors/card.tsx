"use client"

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ProfessorImage from "./image";

type ProfessorCardProps = {
  prof: Professor;
};

export default function ProfessorCard({ prof }: ProfessorCardProps) {
  const redirectTo = () => {
    window.location.href = `/professors/${prof.id}`;
  }

  return (
    <Card className="flex flex-col lg:flex-row rounded-lg shadow-lg p-4 bg-white border border-ub-secondary hover:shadow-2xl transition-shadow duration-300 hover:cursor-pointer" onClick={redirectTo}>
      <div className="flex self-center items-center justify-center">
        <ProfessorImage prof={prof} />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-auto text-sm text-left text-ub-primary w-full border-collapse">
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
          </tbody>
        </table>
        <div className="flex flex-row w-full">
          <p className="px-4 py-2 text-ub-secondary text-sm block w-1/4">
            <span className="font-bold text-xl">{prof.reviewsCount}</span> Reviews 
          </p>
          <p className="px-4 py-2 text-ub-secondary text-sm block w-1/3">
            <span className="font-bold text-xl">{prof.avgDiffRate.toFixed(1)} / 5</span>  Difficulty  
          </p>
          <p className="px-4 py-2 text-ub-secondary text-sm block w-1/3">
            <span className="font-bold text-xl">{prof.avgFriendlyRate.toFixed(1)} / 5</span>  Friendly 
          </p>
        </div>
        <div className="pl-4">
          <Progress value={prof.avgDiffRate / 5 * 100} className="[&>*]:bg-ub-primary my-2" />
          <Progress value={prof.avgFriendlyRate / 5 * 100} className="[&>*]:bg-ub-secondary my-2" />
        </div>
      </div>


    </Card>
  );
}

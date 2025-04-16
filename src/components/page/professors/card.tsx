import { Card } from "@/components/ui/card";
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
      <div className="flex-grow ml-4">
        <h2 className="text-xl font-semibold text-gray-800">{prof.name}</h2>
        <p className="text-gray-600 text-sm mt-2">
          <span className="font-semibold">Fakultas:</span> {prof.faculty}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          <span className="font-semibold">Jurusan:</span> {prof.major}
        </p>
      </div>
    </Card>
  );
}

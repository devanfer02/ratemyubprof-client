import ProfessorCard from "@/components/page/professors/card";
import SearchProfessor from "@/components/page/professors/search";
import { PaginationUI } from "@/components/shared/pagination/pagination";
import { fetchProfessors } from "@/services/professor"

export default async function Test({ searchParams }: { searchParams: { [key: string]: string } }) {
  searchParams = await searchParams
  const params = {
    name: searchParams.name || "",
    faculty: searchParams.faculty || "",
    major: searchParams.major || "",
    page: Math.max(1, parseInt(searchParams.page || '1', 10)).toString()
  } as FetchProfParam

  const [profs, meta, error] = await fetchProfessors(params)

  if (error) {
    console.log("Professors.Index", error)
    return (
      <div className="">
        <div>
          <SearchProfessor params={params} />
        </div>
        <div className="h-screen flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800">An error occured</h1>
          </div>
        </div>
      </div>
    )
  }

  if (profs?.length === 0 || profs === null) {
    return (
      <div className="">
        <div>
          <SearchProfessor params={params} />
        </div>
        <div className="h-screen flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800">No results found</h1>
            <p className="text-gray-600 mt-2">Try searching with different keywords.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[1000px]">
      <div>
        <SearchProfessor params={params} />
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mx-8 my-10">
        {profs?.map(prof => (
          <ProfessorCard prof={prof} key={prof.name} />
        ))}
      </div>
      <PaginationUI meta={meta!} path="/professors" />
    </div>
  )
}
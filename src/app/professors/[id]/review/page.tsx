type ReviewProfessorProps = {
  params: {
    id: string 
  }
}

export default async function ReviewProfessor({params}: ReviewProfessorProps) {
  const { id } = await params 

  return (
    <>
    </>
  )
}
import { redirect } from "next/navigation";

type ReviewRedirectProps = {
  params: {
    id: string
  }
}


export default function ReviewRedirect({params}: ReviewRedirectProps) {
  redirect(`/professors/${params.id}#review-section`)
}
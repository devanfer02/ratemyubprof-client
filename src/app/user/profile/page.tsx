import UserProfile from "@/components/page/profile/user-profile";
import { fetchUserProfile } from "@/services/user";

export default async function Page() {
  const [data, err] = await fetchUserProfile();

  if (err || !data) {
    console.log(err)
    return <div className="min-h-screen flex flex-col justify-center items-center">An Error occured. See logs</div>;
  }

  return <UserProfile userProfile={data} status="authenticated"/>
}

import UserProfile from "@/components/page/profile/user-profile";
import { getServerAuthStatus } from "@/services/auth";
import { fetchUserProfileByUsername } from "@/services/user";
type UserProfileParams = Promise<{ username: string }>;

export default async function Page(props: { params: UserProfileParams }) {

  const { username } = await props.params
  const [data, err] = await fetchUserProfileByUsername(username);

  const status = await getServerAuthStatus();

  if (err || !data) {
    console.log(err)
    return <div className="min-h-screen flex flex-col justify-center items-center">An Error occured. See logs</div>;
  }
  
  return <UserProfile userProfile={data} status={status}/>
}

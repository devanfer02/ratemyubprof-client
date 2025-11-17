import ReviewCard from "@/components/shared/card/review-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale"

type UserProfileProps = {
  userProfile: UserProfile
  status: "authenticated" | "unauthenticated"
}

export default async function UserProfile({userProfile, status}: UserProfileProps) {

  return (
    <div className="container mx-auto mt-8 mb-10 min-h-screen">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>
                    {userProfile.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{userProfile.user.username}</h1>
                  <p className="text-muted-foreground">
                    Joined {format(
                      new Date("2025-04-18 23:21:30.458616 +0000 +0000"),
                      "dd-MMMM-yyyy",
                      { locale: id }
                    )}
                  </p>
                </div>
              </div>  
              <table className="table-auto border-collapse">
                <tbody>
                  <tr className="h-8">
                    <td className="font-semibold pr-4">Total Reviews:</td>
                    <td>{userProfile.reviewsCount}</td>
                  </tr>
                </tbody>
              </table>

            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Recent Reviews</h2>
          <div className="space-y-4 max-h-[700px] overflow-y-auto">
            {userProfile.recentReviews.map((review) => (
              <ReviewCard review={review} status={status} key={review.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

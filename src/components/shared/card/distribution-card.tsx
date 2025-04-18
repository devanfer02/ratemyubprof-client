import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type DistributionCardProps = {
  meta: DifficultyDistribution
  name: string
}

export default function DistributionCard({ name, meta }: DistributionCardProps) {
  const totalValue = Object.values(meta).reduce((acc, value) => acc + value, 0)

  return (
    <Card className="w-full p-5 shadow-xl border border-ub-secondary">
      <h2 className="font-semibold">{name}</h2>
      <ul className="space-y-1">
        {Object.entries(meta).map(([key, value]) => (
          <div className="flex flex-col" key={key}>
            <span>Rating {key.toString().charAt(key.toString().length - 1)}</span>
            <div className="flex items-center gap-x-1">
              <Progress
                value={(value / totalValue) * 100}
                className="flex-1 h-3 rounded-md [&>*]:bg-blue-500"
              />
              <span className="w-10 text-center font-semibold">{value}</span>
            </div>

          </div>
        ))}
      </ul>
    </Card>
  )
}
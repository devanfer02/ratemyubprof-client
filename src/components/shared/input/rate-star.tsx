"use client"

import { Icon } from "@iconify/react/dist/iconify.js";

type RatingStarProps = {
  rate: number;
  rateName: string;
  onClick: (rate: number) => void;
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  description: string
}

const RatingStar = ({
  rate,
  rateName,
  onClick,
  hoveredIndex,
  setHoveredIndex,
  description
}: RatingStarProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((index) => (
            <Icon
              key={rateName + index}
              icon="bxs:star"
              width={50}
              height={50}
              className={`cursor-pointer transition-colors mx-2 ${(rate && rate !== 0 ? rate : hoveredIndex) >= index
                  ? "text-ub-secondary"
                  : "text-ub-primary"
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(0)}
              onClick={() => onClick(index)}
            />
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      </div>

    </>
  )
}

export default RatingStar;


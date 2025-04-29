"use client"

import { Icon } from "@iconify/react/dist/iconify.js";

type RatingStarProps = {
  rate: number;
  rateName: string;
  onClick: (rate: number) => void;
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
}

const RatingStar = ({
  rate,
  rateName,
  onClick,
  hoveredIndex,
  setHoveredIndex,
}: RatingStarProps) => {
  return (
    <>
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
    </>
  )
}

export default RatingStar;


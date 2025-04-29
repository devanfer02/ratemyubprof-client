import { Icon } from "@iconify/react/dist/iconify.js";
import { 
  FieldValues, 
} from "react-hook-form";

type RatingStarProps<T extends FieldValues> = {
  rate: number;
  onClick: (rate: number) => void;
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
}

const RatingStar = <T extends FieldValues>({
  rate,
  onClick,
  hoveredIndex,
  setHoveredIndex,
}: RatingStarProps<T>) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((index) => (
        <Icon
          key={index}
          icon="bxs:star"
          width={50}
          height={50}
          className={`cursor-pointer transition-colors mx-2 ${(rate !== 0 ? rate : hoveredIndex) >= index
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


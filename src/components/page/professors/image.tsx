"use client"

import Image from "next/image";
import { useState } from "react";

type ProfessorImageProps = {
  prof: Professor
}

export default function ProfessorImage({prof}: ProfessorImageProps) {
  const [imgSrc, setImgSrc] = useState(prof.profileImgLink);

  return (
    <Image
      src={imgSrc}
      width={120}
      height={120}
      alt={prof.name}
      className="object-cover"
      onError={() => setImgSrc("/assets/mp.jpg")}
    />
  )
}
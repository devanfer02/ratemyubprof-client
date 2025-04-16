import Image from "next/image";

type AboutIcons = {
  src: string;
  text: string;
}

const icons: AboutIcons[] = [
  {
    src: "https://www.ratemyprofessors.com/assets/instructional-slide-pencil-lady-eBzFb3r-.svg",
    text: "Create reviews abut specific professor"
  },
  {
    src: "https://www.ratemyprofessors.com/assets/instructional-slide-mystery-lady-su09fWIz.svg",
    text: "Your reviews are anonymous"
  },
  {
    src: "https://www.ratemyprofessors.com/assets/instructional-slide-thumb-war-C6_Lq4Ib.svg",
    text: "Give likes or dislikes to other reviews"
  },
]

export default function About() {
  return (
    <div className="mb-10">
      <div className="text-center mb-5">
        <h1 className="font-extrabold text-4xl">Join Our Community!</h1>
        <div className="flex justify-center">
          <p className="max-w-xl">
            Rate My Brawijaya Professors is a platform for students to share their
            experiences and rate their professors. Join us to help other students
            make informed decisions about their education.
          </p>
        </div>
      </div>
      <div className="flex mx-auto justify-center gap-x-10">
        { icons.map((icon) => (
          <div className="flex flex-col justify-between h-full min-h-[400px]" key={icon.src}>
            <Image 
              src={icon.src}
              alt="idk"
              width={400}
              height={400}
            />
            <p className="text-center text-xl font-bold">{icon.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
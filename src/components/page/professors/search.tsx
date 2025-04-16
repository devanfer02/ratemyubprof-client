"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

type SearchProfessorProps = {
  params: FetchProfParam
}

export default function SearchProfessor({params}: SearchProfessorProps) {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FetchProfParam>({
    defaultValues: {
      name: params.name,
      faculty: params.faculty,
      major: params.major,
    }
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: FetchProfParam) => {
    router.push('?name=' + data.name + '&faculty=' + data.faculty + '&major=' + data.major)
  };

  return (
    <div className="w-full p-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Professor</h2>

      <Accordion type="single" collapsible value={open ? "filters" : undefined} onValueChange={(val) => setOpen(val === "filters")}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <AccordionItem value="filters" className="border-none">
            {/* Name input + Trigger icon beside */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="flex-1"
                  placeholder="Enter professor's name"
                />
                  <button
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className={`p-2 border rounded-md transition text-xl ${
                      open
                        ? "border-ub-secondary bg-blue-100 text-ub-secondary"
                        : "border-gray-300 hover:bg-gray-100 text-ub-primary"
                    }`}
                  >
                    <Icon icon="solar:filter-bold" />
                  </button>

              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Accordion content for faculty and major */}
            <AccordionContent>
              <div className="flex flex-col gap-4 pt-4">
                {/* Faculty Input */}
                <div>
                  <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty
                  </label>
                  <Input
                    type="text"
                    id="faculty"
                    {...register("faculty")}
                    placeholder="Enter faculty"
                  />
                </div>

                {/* Major Input */}
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                    Major
                  </label>
                  <Input
                    type="text"
                    id="major"
                    {...register("major")}
                    placeholder="Enter major"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-ub-secondary text-white font-semibold rounded-lg hover:bg-white border border-ub-secondary hover:text-ub-secondary transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </Accordion>
    </div>
  );
}

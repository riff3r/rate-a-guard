import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <div className="flex gap-2 mb-2">
            <div className="text-7xl font-poppins  font-[900] ">4.6</div>
            <div className="text-base text-gray-400 font-bold top-3 relative">
              / 5
            </div>
          </div>

          <div className="font-semibold">
            Overall Quality Based on{" "}
            <a href="#" className="underline">
              22 Ratings
            </a>
          </div>

          <div className="flex items-center gap-2 my-5">
            <h1 className=" font-poppins text-5xl font-black">
              Ashley Moraguez
            </h1>
            <Bookmark />
          </div>

          <div className="">
            <Button className="rounded-full font-extrabold mb-4" size={"lg"}>
              Rate <ArrowRight strokeWidth={3} />
            </Button>

            <div className="font-bold mb-5">Professor Moraguez's Top Tags</div>

            <div className="flex gap-2">
              <Button
                className="rounded-full font-extrabold"
                variant={"secondary"}
                size={"default"}
              >
                Get ready to read
              </Button>
              <Button
                className="rounded-full font-extrabold"
                variant={"secondary"}
                size={"default"}
              >
                Tough grader
              </Button>
            </div>
          </div>
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default page;

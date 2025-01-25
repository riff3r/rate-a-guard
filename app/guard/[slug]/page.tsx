import GuardRatingChart from "@/components/guard/GuardRatingChart";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, ChevronDown } from "lucide-react";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div>
      <div className="flex gap-10">
        <div className="w-4/12">
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

            <div className="font-bold mb-5">Professor Moraguezs Top Tags</div>

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

        <div className="w-4/12">
          <GuardRatingChart />

          <div className="p-5 bg-primary-foreground">
            <p className="font-bold mb-5">Similar Professors</p>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 w-full">
                <div className="bg-primary font-poppins text-white font-bold py-2 px-4 flex justify-center items-center">
                  4.80
                </div>

                <div>Lor aine Smith</div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="bg-primary font-poppins text-white font-bold py-2 px-4 flex justify-center items-center">
                  4.80
                </div>

                <div>John Doe</div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="bg-primary font-poppins text-white font-bold py-2 px-4 flex justify-center items-center">
                  4.80
                </div>

                <div>Aine Arsmith</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-8/12">
        <Tabs defaultValue="profile">
          <TabsList className="mb-5">
            <TabsTrigger value="profile">22 Student Ratings</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" className="font-bold mb-5">
          All <ChevronDown strokeWidth={3} />
        </Button>

        <div className="flex flex-col gap-5">
          <div className="flex gap-2 p-5 bg-primary-foreground">
            <div className="flex gap-5">
              <div className="h-16 min-w-[72px] bg-destructive font-poppins text-3xl font-extrabold flex justify-center items-center">
                4.8
              </div>

              <div>
                Moraguez is such a nice person! She&apos;s interested in
                students learning the material, she&apos;s willing to answer
                questions about the material in class. She&apos;s young, so she
                understands that this is not the only class her students take.
                Really enjoyed her, would highly recommend this class to anyone
                that enjoys American politics.
              </div>
            </div>
          </div>
          <div className="flex gap-2 p-5 bg-primary-foreground">
            <div className="flex gap-5">
              <div className="h-16 min-w-[72px] bg-destructive font-poppins text-3xl font-extrabold flex justify-center items-center">
                4.8
              </div>

              <div>
                Moraguez is such a nice person! She&apos;s interested in
                students learning the material, she&apos;s willing to answer
                questions about the material in class. She&apos;s young, so she
                understands that this is not the only class her students take.
                Really enjoyed her, would highly recommend this class to anyone
                that enjoys American politics.
              </div>
            </div>
          </div>
          <div className="flex gap-2 p-5 bg-primary-foreground">
            <div className="flex gap-5">
              <div className="h-16 min-w-[72px] bg-destructive font-poppins text-3xl font-extrabold flex justify-center items-center">
                4.8
              </div>

              <div>
                Moraguez is such a nice person! She&apos;s interested in
                students learning the material, she&apos;s willing to answer
                questions about the material in class. She&apos;s young, so she
                understands that this is not the only class her students take.
                Really enjoyed her, would highly recommend this class to anyone
                that enjoys American politics.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

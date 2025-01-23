import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="border rounded-md shadow-md px-8 py-6">
        <h2 className="text-md font-bold mb-5">
          Attendance / Punctuality <span className="text-red-500">*</span>{" "}
        </h2>

        <p className="text-center font-semibold">Here will be star rating</p>
      </div>

      <div className="border rounded-md shadow-md px-8 py-6">
        <h2 className="text-md font-bold mb-5">
          Professionalism <span className="text-red-500">*</span>{" "}
        </h2>

        <p className="text-center font-semibold">Here will be star rating</p>
      </div>

      <div className="border rounded-md shadow-md px-8 py-6">
        <h2 className="text-md font-bold mb-5">
          Productivity <span className="text-red-500">*</span>{" "}
        </h2>

        <p className="text-center font-semibold">Here will be star rating</p>
      </div>

      <div className="border rounded-md shadow-md px-8 py-6">
        <h2 className="text-md font-bold mb-5">
          Customer Service <span className="text-red-500">*</span>{" "}
        </h2>

        <p className="text-center font-semibold">Here will be star rating</p>
      </div>

      <div className="border rounded-md shadow-md px-8 py-6">
        <h2 className="text-md font-bold mb-5">
          Communication <span className="text-red-500">*</span>{" "}
        </h2>

        <p className="text-center font-semibold">Here will be star rating</p>
      </div>

      <div className="border rounded-md shadow-md px-8 py-6">
        <h2 className="text-md font-bold mb-5">
          Write a Review <span className="text-red-500">*</span>{" "}
        </h2>

        <Textarea className="min-h-32" placeholder="Type your message here." />
      </div>

      <div className="border rounded-md shadow-md px-8 py-6 text-center">
        <p className="mb-5">
          By clicking the &quot;Submit&quot; button, I acknowledge that I have
          read and agreed to the Rate A Guard Site Guidelines, Terms of Use and
          Privacy Policy.
        </p>

        <Button className="rounded-full w-60">Submit Rating</Button>
      </div>
    </div>
  );
};

export default page;

import { TabsContent } from "@radix-ui/react-tabs";
import { Pencil } from "lucide-react";

const page = () => {
  return (
    <TabsContent value="profile">
      <div className="my-6 flex items-center justify-end gap-4">
        <Pencil size={18} strokeWidth={3} className="cursor-pointer" />
        <span className="cursor-pointer text-sm font-semibold">Edit</span>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center">
          <span className="w-96">First Name </span>
          <div className="w-full">John</div>
        </div>
        <div className="flex items-center">
          <span className="w-96">Last Name </span>
          <div className="w-full">Doe</div>
        </div>
        <div className="flex items-center">
          <span className="w-96">Company Name</span>
          <div className="w-full">Example Company</div>
        </div>
      </div>
    </TabsContent>
  );
};

export default page;

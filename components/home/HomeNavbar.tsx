import { Button } from "../ui/button";

const HomeNavbar = () => {
  return (
    <div className="bg-white shadow-sm px-6 py-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="logo bg-black px-6 py-1 text-center text-lg font-semibold text-white">
              RAG
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" variant={"ghost"} className=" font-semibold">
              Login
            </Button>
            <Button
              size="sm"
              className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
            >
              Register
            </Button>

            {/* <Button className='rounded-full bg-white font-semibold text-black hover:bg-neutral-700 hover:text-white h-8'>Help</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Success = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold text-dark-700 mb-2">Company Created Successfully</h1>
                <p className="text-base text-gray-700 mb-6">
                    Your company has been successfully created. However, it needs to be approved by an administrator
                    before it becomes active. You will be notified once the approval process is complete.
                </p>
                <Button
                    size="lg"
                    className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus:outline-none"
                    onClick={async () => {
                        "use server";

                        redirect(`/company/${slug}`);
                    }}
                >
                    View Company Status
                </Button>
            </div>
        </div>
    );
};

export default Success;

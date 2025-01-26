import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Success = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold text-dark-700 mb-2">Thanks for your review</h1>
                <p className="text-base text-gray-700 mb-6">
                    Your feedback has been successfully shared, and it helps us ensure that our team continues to
                    deliver exceptional service. Whether it’s their professionalism, attentiveness, or commitment to
                    keeping you safe, your kind words mean a lot.
                </p>
                <Button
                    size="lg"
                    className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                    onClick={async () => {
                        "use server";

                        redirect(`/guard/${slug}`);
                    }}
                >
                    View Your Rating
                </Button>
            </div>
        </div>
    );
};

export default Success;

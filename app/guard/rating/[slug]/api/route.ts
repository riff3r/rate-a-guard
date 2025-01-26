import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RatingRequest = {
    regularityRating: number;
    professionalismRating: number;
    productivityRating: number;
    customerServiceRating: number;
    communicationRating: number;
    rehirable: string;
    review: string;
};

const POST = async (request: Request, { params }: { params: { slug: string } }) => {
    const { slug } = params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");
    const {
        regularityRating,
        professionalismRating,
        productivityRating,
        customerServiceRating,
        communicationRating,
        rehirable,
        review,
    }: RatingRequest = await request.json();

    const response = await fetch(`${process.env.RATE_A_GUARD_BACKEND_BASE_URL}/api/employee-ratings/${slug}`, {
        method: "POST",
        body: JSON.stringify({
            regularityRating,
            professionalismRating,
            productivityRating,
            customerServiceRating,
            communicationRating,
            rehirable,
            review,
        }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionToken?.value}` },
    });

    const data = await response.json();

    return NextResponse.json(data);
};

export { POST };

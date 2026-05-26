import { connectDB } from "../../../lib/mongodb";
import Hospital from "../../../models/Hospital";

export async function GET() {
  try {
    await connectDB();

    const hospitals = await Hospital.find();

    return Response.json(hospitals);
  } catch (error: any) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
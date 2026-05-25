import { connectDB } from "../../../lib/mongodb";
import Hospital from "../../../models/Hospital";

export async function GET() {
  try {
    await connectDB();

    let hospitals = await Hospital.find();

    if (hospitals.length === 0) {
      await Hospital.create([
        {
          name: "Apollo Hospital",
          city: "Bangalore",
          specialization: "Cardiology",
        },
        {
          name: "Manipal Hospital",
          city: "Mysore",
          specialization: "Neurology",
        },
      ]);

      hospitals = await Hospital.find();
    }

    return Response.json(hospitals);
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
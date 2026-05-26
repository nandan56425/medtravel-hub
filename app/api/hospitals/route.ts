import { connectDB } from "../../../lib/mongodb";
import Hospital from "../../../models/Hospital";

export async function GET() {
  try {
    await connectDB();

    let hospitals = await Hospital.find();

    // Add sample hospitals if database is empty
    if (hospitals.length === 0) {
      await Hospital.create([
        {
          name: "Apollo BGS Hospital",
          city: "Mysuru",
          specialization: "Cardiology",
        },
        {
          name: "Manipal Hospital",
          city: "Mysuru",
          specialization: "Neurology",
        },
        {
          name: "Narayana Multispeciality Hospital",
          city: "Mysuru",
          specialization: "Orthopedics",
        },
      ]);

      hospitals = await Hospital.find();
    }

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

import { connectDB } from "../../../lib/mongodb";
import Hospital from "../../../models/Hospital";

export async function GET() {
  try {
    await connectDB();

    // Clear old data
    await Hospital.deleteMany({});

    // Insert fresh hospitals
    await Hospital.create([
      {
        name: "Apollo BGS Hospital",
        city: "Mysuru",
        specialization: "Cardiology",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        rating: 4.8,
        location: "Mysuru, Karnataka",
        description:
          "Leading multi-speciality hospital with international patient care.",
      },
      {
        name: "Manipal Hospital",
        city: "Mysuru",
        specialization: "Neurology",
        image:
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
        rating: 4.7,
        location: "Mysuru, Karnataka",
        description:
          "Advanced neurology and surgical treatment center.",
      },
      {
        name: "Narayana Multispeciality Hospital",
        city: "Mysuru",
        specialization: "Orthopedics",
        image:
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
        rating: 4.6,
        location: "Mysuru, Karnataka",
        description:
          "Comprehensive orthopedic and trauma care hospital.",
      },
    ]);

    // Fetch hospitals
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

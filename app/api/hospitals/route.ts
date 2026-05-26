import { seedHospitals } from "../../../lib/data";

export async function GET() {
  try {
    const hospitals = seedHospitals.map((hospital, index) => ({
      ...hospital,
      _id: String(index + 1),
    }));

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

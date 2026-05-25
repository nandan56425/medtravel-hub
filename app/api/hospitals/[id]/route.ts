import { NextResponse } from 'next/server'
import { seedHospitals } from '@/lib/data'

const hospitals = seedHospitals.map((h, i) => ({ ...h, _id: String(i + 1) }))

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const hospital = hospitals.find(h => h._id === id)
    
    if (!hospital) {
      return NextResponse.json(
        { message: 'Hospital not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(hospital)
  } catch (error) {
    console.error('Error fetching hospital:', error)
    return NextResponse.json(
      { message: 'Failed to fetch hospital' },
      { status: 500 }
    )
  }
}

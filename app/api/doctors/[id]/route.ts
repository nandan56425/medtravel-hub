import { NextResponse } from 'next/server'
import { seedDoctors } from '@/lib/data'

const doctors = seedDoctors.map((d, i) => ({ ...d, _id: String(i + 1) }))

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const doctor = doctors.find(d => d._id === id)
    
    if (!doctor) {
      return NextResponse.json(
        { message: 'Doctor not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(doctor)
  } catch (error) {
    console.error('Error fetching doctor:', error)
    return NextResponse.json(
      { message: 'Failed to fetch doctor' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { seedDoctors } from '@/lib/data'

const doctors = seedDoctors.map((d, i) => ({ ...d, _id: String(i + 1) }))

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hospitalName: string }> }
) {
  try {
    const { hospitalName } = await params
    const decodedName = decodeURIComponent(hospitalName)
    const filteredDoctors = doctors.filter(d => d.hospital === decodedName)
    
    return NextResponse.json(filteredDoctors)
  } catch (error) {
    console.error('Error fetching doctors by hospital:', error)
    return NextResponse.json(
      { message: 'Failed to fetch doctors' },
      { status: 500 }
    )
  }
}

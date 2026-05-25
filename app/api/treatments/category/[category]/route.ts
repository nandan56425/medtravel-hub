import { NextResponse } from 'next/server'
import { seedTreatments } from '@/lib/data'

const treatments = seedTreatments.map((t, i) => ({ ...t, _id: String(i + 1) }))

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params
    const decodedCategory = decodeURIComponent(category)
    const filteredTreatments = treatments.filter(t => t.category === decodedCategory)
    
    return NextResponse.json(filteredTreatments)
  } catch (error) {
    console.error('Error fetching treatments by category:', error)
    return NextResponse.json(
      { message: 'Failed to fetch treatments' },
      { status: 500 }
    )
  }
}

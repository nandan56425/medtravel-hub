import { NextResponse } from 'next/server'
import type { Enquiry } from '@/lib/types'

// Shared in-memory store reference (in production, use database)
// This is a simplified version - in real app, use database
let enquiries: Enquiry[] = []

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const enquiryIndex = enquiries.findIndex(e => e._id === id)
    
    if (enquiryIndex === -1) {
      return NextResponse.json(
        { message: 'Enquiry not found' },
        { status: 404 }
      )
    }
    
    // Update only the status field
    if (body.status && ['new', 'contacted', 'booked', 'completed'].includes(body.status)) {
      enquiries[enquiryIndex] = {
        ...enquiries[enquiryIndex],
        status: body.status,
      }
    }
    
    return NextResponse.json(enquiries[enquiryIndex])
  } catch (error) {
    console.error('Error updating enquiry:', error)
    return NextResponse.json(
      { message: 'Failed to update enquiry' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import type { Enquiry } from '@/lib/types'

// In-memory store (would be MongoDB in production)
let enquiries: Enquiry[] = []
let enquiryIdCounter = 1

export async function GET() {
  try {
    return NextResponse.json(enquiries)
  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json(
      { message: 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    const newEnquiry: Enquiry = {
      _id: `MTH-2024-${String(enquiryIdCounter++).padStart(5, '0')}`,
      name: body.name,
      email: body.email,
      phone: body.phone,
      country: body.country,
      treatment: body.treatment,
      hospital: body.hospital,
      preferredDate: body.preferredDate || new Date().toISOString(),
      needsVisa: body.needsVisa || false,
      needsAirportTransfer: body.needsAirportTransfer || false,
      needsVideoConsult: body.needsVideoConsult || false,
      message: body.message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    }
    
    enquiries.push(newEnquiry)
    
    return NextResponse.json(newEnquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating enquiry:', error)
    return NextResponse.json(
      { message: 'Failed to create enquiry' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import type { PostCare } from '@/lib/types'

// In-memory store (would be MongoDB in production)
let postCareRecords: PostCare[] = [
  // Sample data for demo
  {
    _id: 'PC-001',
    patientEmail: 'demo@example.com',
    treatment: 'Advanced Cardiac Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    doctor: 'Dr. Rajesh Kumar',
    dischargeDate: '2024-03-15',
    followUpDates: ['2024-03-22', '2024-04-15'],
    videoFollowUpLink: 'https://meet.google.com/demo-link',
    notes: 'Recovery progressing well. Continue prescribed medications and follow exercise guidelines. Next video consultation scheduled for March 22.',
    status: 'recovering',
  },
]

let postCareIdCounter = 2

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['patientEmail', 'treatment', 'hospital', 'doctor', 'dischargeDate']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    const newRecord: PostCare = {
      _id: `PC-${String(postCareIdCounter++).padStart(3, '0')}`,
      patientEmail: body.patientEmail,
      treatment: body.treatment,
      hospital: body.hospital,
      doctor: body.doctor,
      dischargeDate: body.dischargeDate,
      followUpDates: body.followUpDates || [],
      videoFollowUpLink: body.videoFollowUpLink || '',
      notes: body.notes || '',
      status: body.status || 'recovering',
    }
    
    postCareRecords.push(newRecord)
    
    return NextResponse.json(newRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating post-care record:', error)
    return NextResponse.json(
      { message: 'Failed to create post-care record' },
      { status: 500 }
    )
  }
}

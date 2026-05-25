import { NextResponse } from 'next/server'
import type { PostCare } from '@/lib/types'

// In-memory store (shared with route.ts in production use database)
let postCareRecords: PostCare[] = [
  {
    _id: 'PC-001',
    patientEmail: 'demo@example.com',
    treatment: 'Advanced Cardiac Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    doctor: 'Dr. Rajesh Kumar',
    dischargeDate: '2024-03-15',
    followUpDates: ['2024-03-22', '2024-04-15'],
    videoFollowUpLink: 'https://meet.google.com/demo-link',
    notes: 'Recovery progressing well. Continue prescribed medications and follow exercise guidelines.',
    status: 'recovering',
  },
]

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params
    const decodedEmail = decodeURIComponent(email)
    
    const records = postCareRecords.filter(
      r => r.patientEmail.toLowerCase() === decodedEmail.toLowerCase()
    )
    
    return NextResponse.json(records)
  } catch (error) {
    console.error('Error fetching post-care records:', error)
    return NextResponse.json(
      { message: 'Failed to fetch post-care records' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    // In this case, email param is actually the ID for PATCH requests
    const { email: id } = await params
    const body = await request.json()
    
    const recordIndex = postCareRecords.findIndex(r => r._id === id)
    
    if (recordIndex === -1) {
      return NextResponse.json(
        { message: 'Post-care record not found' },
        { status: 404 }
      )
    }
    
    // Update status
    if (body.status && ['recovering', 'completed'].includes(body.status)) {
      postCareRecords[recordIndex] = {
        ...postCareRecords[recordIndex],
        status: body.status,
      }
    }
    
    return NextResponse.json(postCareRecords[recordIndex])
  } catch (error) {
    console.error('Error updating post-care record:', error)
    return NextResponse.json(
      { message: 'Failed to update post-care record' },
      { status: 500 }
    )
  }
}

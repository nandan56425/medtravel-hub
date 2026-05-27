'use client'

import useSWR from 'swr'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Navbar } from '@/components/navbar'

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json())

export default function MyEnquiriesPage() {

  const {
    data: enquiries,
    isLoading,
  } = useSWR('/api/enquiries', fetcher)

  return (
    <ProtectedRoute>
      <>
        <Navbar />

        <main className="min-h-screen pt-32 px-4">

          <div className="container mx-auto max-w-4xl">

            <h1 className="text-4xl font-bold mb-8">
              My Enquiries
            </h1>

            {isLoading ? (

              <p>Loading enquiries...</p>

            ) : enquiries?.length > 0 ? (

              <div className="space-y-6">

                {enquiries.map((enquiry: any) => (

                  <div
                    key={enquiry._id}
                    className="border rounded-2xl p-6 shadow-sm"
                  >

                    <h2 className="text-xl font-semibold mb-2">
                      {enquiry.treatment}
                    </h2>

                    <p className="text-muted-foreground mb-4">
                      {enquiry.message}
                    </p>

                    <div className="space-y-1 text-sm">

                      <p>
                        <strong>Enquiry ID:</strong> {enquiry._id}
                      </p>

                      <p>
                        <strong>Hospital:</strong> {enquiry.hospital}
                      </p>

                      <p>
                        <strong>Name:</strong> {enquiry.name}
                      </p>

                      <p>
                        <strong>Email:</strong> {enquiry.email}
                      </p>

                      <p>
                        <strong>Phone:</strong> {enquiry.phone}
                      </p>

                      <p>
                        <strong>Country:</strong> {enquiry.country}
                      </p>

                      <p>
                        <strong>Status:</strong> {enquiry.status}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <p>No enquiries submitted yet.</p>

            )}

          </div>

        </main>
      </>
    </ProtectedRoute>
  )
}

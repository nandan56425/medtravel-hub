import type { Hospital, Doctor, Treatment, Enquiry, PostCare } from './types'

const API_BASE = '/api'

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || `API Error: ${res.status}`)
  }

  return res.json()
}

// Hospital API
export const hospitalAPI = {
  getAll: () => fetchAPI<Hospital[]>('/hospitals'),
  getById: (id: string) => fetchAPI<Hospital>(`/hospitals/${id}`),
}

// Doctor API
export const doctorAPI = {
  getAll: () => fetchAPI<Doctor[]>('/doctors'),
  getByHospital: (hospitalName: string) => 
    fetchAPI<Doctor[]>(`/doctors/hospital/${encodeURIComponent(hospitalName)}`),
  getById: (id: string) => fetchAPI<Doctor>(`/doctors/${id}`),
}

// Treatment API
export const treatmentAPI = {
  getAll: () => fetchAPI<Treatment[]>('/treatments'),
  getByCategory: (category: string) => 
    fetchAPI<Treatment[]>(`/treatments/category/${encodeURIComponent(category)}`),
  getById: (id: string) => fetchAPI<Treatment>(`/treatments/${id}`),
}

// Enquiry API
export const enquiryAPI = {
  submit: (data: Omit<Enquiry, '_id' | 'status' | 'createdAt'>) =>
    fetchAPI<Enquiry>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => fetchAPI<Enquiry[]>('/enquiries'),
  updateStatus: (id: string, status: Enquiry['status']) =>
    fetchAPI<Enquiry>(`/enquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

// PostCare API
export const postCareAPI = {
  create: (data: Omit<PostCare, '_id'>) =>
    fetchAPI<PostCare>('/postcare', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getByEmail: (email: string) =>
    fetchAPI<PostCare[]>(`/postcare/${encodeURIComponent(email)}`),
  updateStatus: (id: string, status: PostCare['status']) =>
    fetchAPI<PostCare>(`/postcare/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

// SWR fetcher
export const fetcher = <T>(url: string): Promise<T> => 
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })

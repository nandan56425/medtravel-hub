# MedTravel

**Where Healing Meets Heritage**

MedTravel is a healthcare tourism platform designed to help international and domestic patients connect with leading hospitals, doctors, treatments, accommodation facilities, and post-care services in Mysuru, India.

The platform provides a seamless experience for patients seeking medical treatment while also helping them arrange their stay, consultations, and recovery plans.

---

## Features

### Authentication

* User Registration
* User Login
* Protected Routes
* Session-based access control

### Hospitals

* Browse partner hospitals
* View hospital specialties
* International patient support information
* Hospital contact details

### Doctors

* View available doctors
* Explore doctor specializations
* Hospital-wise doctor listings

### Treatments

* Browse treatment options
* Treatment descriptions
* Hospital recommendations

### Enquiry System

* Submit treatment enquiries
* Patient information collection
* Treatment requirements submission
* Enquiry history support

### Stay & Recovery

* Accommodation options near hospitals
* Hotel details and amenities
* Contact hotel functionality
* One-click phone number copying
* Mobile-friendly contact options

### Post-Care Support

* Recovery guidance
* Follow-up assistance
* Patient support information

---

## Technology Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React Icons
* SWR

### Backend

* Next.js API Routes
* TypeScript
* MongoDB Atlas
* Mongoose

### Deployment

* Vercel

---

## Project Structure

```bash
app/
├── api/
│   ├── auth/
│   ├── hospitals/
│   ├── hotels/
│   └── enquiries/
│
├── hospitals/
├── doctors/
├── treatments/
├── enquiry/
├── post-care/
├── stay-recovery/
└── login/

components/
├── navbar
├── protected-route
├── ui
└── shared-components

lib/
├── mongodb
├── api
└── utilities

models/
└── User
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/nandan56425/medtravel-hub.git
```

### Install Dependencies

```bash
pnpm install
```

### Create Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
```

### Run Development Server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## Deployment

The application is deployed using Vercel.

To deploy:

1. Push changes to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

---

## Security Note

This project is intended for educational and demonstration purposes.

For production deployment:

* Use bcrypt for password hashing
* Use JWT authentication
* Implement role-based authorization
* Add rate limiting
* Enable secure session management
* Validate and sanitize all inputs

---

## Future Improvements

* Doctor appointment booking
* Online payment integration
* Medical record uploads
* WhatsApp integration
* Email notifications
* Admin dashboard
* Patient tracking system
* Real-time chat support
* Multi-language support

---

## Author

**Nandan Yeri**

Developed as a medical tourism and patient support platform connecting healthcare services with accommodation and recovery support.

---

## License

This project is licensed under the MIT License.

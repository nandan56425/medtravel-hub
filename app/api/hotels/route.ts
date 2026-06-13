import { NextResponse } from 'next/server'

const hotels = [
  {
    name: 'Grand Mercure Mysore',
    hospital: 'Apollo BGS Hospital',
    distance: '1.2 km',
    contact: '+91 821 402 1212',
    price: '₹4,500/night',
    amenities: ['WiFi', 'Airport Pickup', 'Room Service'],
    rating: 4.5,
    email: "h9306-re@accor.com",
    address: "Nelson Mandela Circle, Mysuru, Karnataka",
  },

  {
    name: 'Royal Orchid Metropole',
    hospital: 'Manipal Hospital',
    distance: '2 km',
    contact: '+91 821 525 5566',
    price: '₹5,000/night',
    amenities: ['Breakfast', 'WiFi', 'Medical Assistance'],
    rating: 4.6,
    email: "gm.metropole@royalorchidhotels.com",
    address: "Lakshmipuram, Mysuru, Karnataka",
  },

  {
    name: 'Sandesh The Prince',
    hospital: 'Narayana Multispeciality Hospital',
    distance: '1.8 km',
    contact: '+91 821 243 6777',
    price: '₹3,800/night',
    amenities: ['24/7 Support', 'WiFi', 'Restaurant'],
    rating: 4.4,
    email: "info@sandeshtheprince.com",
    address: "Nazarbad, Mysuru, Karnataka",
  },

  {
    name: 'Radisson Blu Plaza Hotel',
    hospital: 'Apollo BGS Hospital',
    distance: '3.5 km',
    contact: '+91 821 710 1234',
    price: '₹7,800/night',
    amenities: ['Luxury Rooms', 'Pool', 'Spa'],
    rating: 4.5,
    email: "writetome@rdmysore.com",
    address: "JC Nagar, Mysuru, Karnataka",
  },

  {
    name: 'The Atrium Boutique Hotel',
    hospital: 'Manipal Hospital',
    distance: '1 km',
    contact: '+91 76761 39092',
    price: '₹3,200/night',
    amenities: ['WiFi', 'Parking', 'Breakfast'],
    rating: 3.9,
    email: "enquiry@theatriumhotel.in",
    address: "Belavata, Mysuru, Karnataka",
  },

  {
    name: 'Hotel Continental Inn & Suites',
    hospital: 'Narayana Multispeciality Hospital',
    distance: '2.4 km',
    contact: '+91 81053 79846',
    price: '₹3,000/night',
    amenities: ['Free WiFi', 'Room Service', 'Parking'],
    rating: 4.5,
    email: "reservations@continentalinn.com",
    address: "Nazarbad, Mysuru, Karnataka",
  },

  {
    name: 'The Quorum Hotel',
    hospital: 'Apollo BGS Hospital',
    distance: '2.8 km',
    contact: '+91 821 429 2777',
    price: '₹3,600/night',
    amenities: ['Restaurant', 'Conference Hall', 'WiFi'],
    rating: 3.9,
    email: "resv.mys@thequorumhotel.in",
    address: "Shivarampet, Mysuru, Karnataka",
  },

  {
    name: 'Regenta Central Herald',
    hospital: 'Manipal Hospital',
    distance: '2.1 km',
    contact: '+91 91489 99012',
    price: '₹4,100/night',
    amenities: ['Gym', 'Restaurant', 'Airport Pickup'],
    rating: 4.2,
    email: "gm.metropole@royalorchidhotels.com",
    address: "Bannimantap, Mysuru, Karnataka",
  },
]

export async function GET() {
  return NextResponse.json(hotels)
}

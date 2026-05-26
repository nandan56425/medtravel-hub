import mongoose, { Schema, models, model } from 'mongoose'

const HotelSchema = new Schema(
  {
    name: String,
    hospital: String,
    distance: String,
    contact: String,
    price: String,
    amenities: [String],
    rating: Number,
  },
  {
    timestamps: true,
  }
)

const Hotel =
  models.Hotel || model('Hotel', HotelSchema)

export default Hotel

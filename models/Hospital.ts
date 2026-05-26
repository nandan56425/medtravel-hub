import mongoose, { Schema, models, model } from "mongoose";

const HospitalSchema = new Schema({
  name: String,
  specialization: String,
  description: String,
  location: String,
  contact: String,
  image: String,
  rating: Number,
  internationalPatientDesk: Boolean,
  keyFeatures: [String],
  languages: [String],
});

const Hospital =
  models.Hospital || model("Hospital", HospitalSchema);

export default Hospital;

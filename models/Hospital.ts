import mongoose, { Schema, models, model } from "mongoose";

const HospitalSchema = new Schema(
  {
    name: String,
    city: String,
    specialization: String,
  },
  {
    timestamps: true,
  }
);

const Hospital =
  models.Hospital || model("Hospital", HospitalSchema);

export default Hospital;
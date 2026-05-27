import mongoose, {
  Schema,
  models,
  model,
} from 'mongoose'

const UserSchema = new Schema(
  {
    fullName: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    phone: String,

    countryOfOrigin: String,
  },

  {
    timestamps: true,
  }
)

const User =
  models.User || model('User', UserSchema)

export default User

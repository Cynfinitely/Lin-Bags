import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  email: string
  isAdmin: boolean
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },
  isAdmin: {
    type: Boolean,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)

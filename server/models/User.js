import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  }
}, {
  timestamps: true
});

export default model("User", UserSchema);
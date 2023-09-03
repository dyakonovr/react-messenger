import { Schema, model } from "mongoose"

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
});

export default model("Message", MessageSchema);
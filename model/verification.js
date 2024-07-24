import mongoose, { Schema as _Schema, model } from 'mongoose';
const { Schema } = mongoose;

const VerificationSchema = new Schema({
  userId: {
    type: _Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '8h', // This will automatically delete the document after 8 hours
  },
});

export default model('Verification', VerificationSchema);

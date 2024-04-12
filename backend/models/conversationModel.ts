import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const conversationModel = model('conversation', conversationSchema);

export default conversationModel;

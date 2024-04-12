import { Request, Response } from 'express';
import conversationModel from '../models/conversationModel';
import Message from '../models/messageModel';

interface AuthenticatedRequest extends Request {
  user?: any; // Add the user property here with the appropriate type
}

const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req?.user?._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
        message: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage?._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);
  } catch (error: any) {
    console.log('error in send message controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default sendMessage;

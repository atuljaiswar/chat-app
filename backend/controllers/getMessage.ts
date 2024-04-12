import { Response, Request } from 'express';
import conversationModel from '../models/conversationModel';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const getMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate('messages');
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error: any) {
    console.log('Error in get message controller', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default getMessage;

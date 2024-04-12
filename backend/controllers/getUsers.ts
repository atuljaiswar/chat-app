import { Response, Request } from 'express';
import userModel from '../models/userModel';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const filterLoggedInUser = await userModel
      .find({
        _id: { $ne: loggedInUserId },
      })
      .select('-password');

    res.status(200).json({ sidebarUsers: filterLoggedInUser });
  } catch (error) {
    console.log('Error while getting user sidebar', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default getUsers;

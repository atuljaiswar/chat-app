import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface AuthenticatedRequest extends Request {
  user?: any; // Add the user property here with the appropriate type
}

const protectedRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: any
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(401).json({
        error: 'Unthorized - Invalid token',
      });
    }

    const user = await User.findById(decoded?.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('error while protecting router', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default protectedRoute;

import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateTokerSetCookie from '../util/getJwtToken';

interface UserModel {
  _id: string;
  fullname: string;
  username: string;
  password: string;
  gender: string;
  profilePic?: string;
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const {
      fullname,
      username,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = body;
    if (password !== confirmPassword) {
      return res.status(404).json({ error: 'Password dont match' });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Hash password here
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokerSetCookie(newUser?._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser?._id,
        fullName: newUser?.fullname,
        userName: newUser?.username,
        profilePic: newUser?.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (e) {
    console.log('Error', e);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req?.body;
    const user: UserModel | undefined | null = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username and password' });
    }
    generateTokerSetCookie(user?._id, res);

    res.status(200).json({
      _id: user?._id,
      fullName: user?.fullname,
      userName: user?.username,
      profilePic: user?.profilePic,
    });
  } catch (error: any) {
    console.log('error in login credential', error.message);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const logOut = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

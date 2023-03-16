import { User, Note } from '../models';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

//@desc Get all users
//@route GET /users
//@access Private
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  req;
  const users = await User.find({}).select('-password').lean();
  if (!users) {
    res.status(400).json({ message: 'No user found' });
  } else {
    res.json(users);
  }
});

//@desc Create a user
//@route POST /users
//@access Private
export const createNewUser = expressAsyncHandler(async (req, res) => {});

//@desc Update a user
//@route PATCH /users
//@access Private
export const updateUser = expressAsyncHandler(async (req, res) => {});

//@desc Delete a user
//@route DELETE /users
//@access Private
export const deleteUser = expressAsyncHandler(async (req, res) => {});

export default { getAllUsers, createNewUser, updateUser, deleteUser };

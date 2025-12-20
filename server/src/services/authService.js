import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async ({name, email, password}) =>{
    const existing = await User.findOne({email});
    if(existing) throw new Error('user already exists');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create ({name, email, passwordHash});
    const token = generateToken(user);

    return {user,token};

};

export const loginUser = async ({email, password}) =>{
    const user = await User.findOne({email});
    if(!user) throw new Error('Invalid email or password');
    const isMatch = await bcrypt.compare(password, user.passwordHash);
     if(!isMatch) throw new Error('Invalid email or password');
    const token = generateToken(user);
    return{user,token};
   
}
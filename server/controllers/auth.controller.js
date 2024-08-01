import UserModel from "../models/user.model.js"
import { errorResponse, successResponse } from "../utils/customResponse.js"
import jwt from 'jsonwebtoken'
import { validator } from 'indicative'
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"
import { DOT_ENV } from "../config/dotEnv.js"
import { decodedToken } from "../utils/decodedToken.js"

// login
export const login = async(req,res) => {
   try {
    const {  email ,password} = req.body    
    if(!email || !password){
      return res.status(400).json(errorResponse('All fields is required'))
    }
    const user = await UserModel.findOne({email}).select('-__v') 
    if(!user){
      return res.status(400).json(errorResponse('Invalid Credential!'))
    }
    if(!bcrypt.compareSync(password, user.password) ){
      return res.status(400).json(errorResponse('Invalid Credential!'))
    }
    generateToken(res,user._id)
    req.user = user;
    return res.status(201).json(successResponse('successfully Login',{id : user._id, username : user.username}))
   } catch (error) {
    console.log('error from signIn',error);
    return res.status(500).json(errorResponse('Internal Server Error'))
   }
   
}

// register
export const register = async(req,res) => {
try {
    const {username , email ,password} = req.body
      if(!username|| !email || !password){
        return res.status(400).json(errorResponse('All fields is required'))
      }
      if(password.length < 6){
        return res.status(400).json(errorResponse('Password must be above 6 char'))
      }
      const existUser =await UserModel.findOne({email})   
      const existUsername =await UserModel.findOne({username})   
      if(existUser || existUsername){
        return res.status(400).json(errorResponse('Username or Email already exist'))
      }
      const images = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await UserModel.create({
          username,email,password :  hashPassword ,image : images[Math.floor(Math.random() * images.length)]
      })
      const user = await UserModel.findById(newUser._id).select('-password -__v') 
      generateToken(res,user._id);
      return res.status(201).json(successResponse('successfully register',user))

} catch (error) {
    console.log('error from signup',error);
    return res.status(500).json(errorResponse('Internal Server Error'))
}
}

// logout
export const logout = async (req,res) => {
   try {
    res.clearCookie('netflix-tk')
    return res.status(201).json(successResponse('successfully Logout'))
   } catch (error) {
    console.log(error, 'error from logout');
    return res.status(500).json(errorResponse("Internal server error"))
   }
}

// auth user
export const user = async (req,res) => {
 try {
  const user = await decodedToken(req,res)
  return res.json(successResponse('success', user))
 } catch (error) {
   return console.log(error);
 }
}
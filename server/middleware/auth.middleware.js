import jwt from 'jsonwebtoken'
import { DOT_ENV } from '../config/dotEnv.js';
import UserModel from '../models/user.model.js';
import { decodedToken } from '../utils/decodedToken.js';
import { errorResponse } from '../utils/customResponse.js';
export const authMiddleware = async (req,res,next) => {
    try {
		const user = await decodedToken(req,res)
		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json(errorResponse('Internal Server Error'));
	}
    
}
import { DOT_ENV } from "../config/dotEnv.js";
import jwt from 'jsonwebtoken'
import UserModel from "../models/user.model.js";
import { errorResponse } from "./customResponse.js";
export const decodedToken= async(req,res) => {
    try {
		const token = req.cookies["netflix-tk"];
		if (!token) {
			return res.status(401).json(errorResponse('Unauthorized - No Token Provided'));
		}
		const decoded = jwt.verify(token, DOT_ENV.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json(errorResponse('Unauthorized - Invalid Token'));
		}
        
        const user = await UserModel.findById(decoded.userId).select("-password");
		if (!user) {
            return res.status(404).json(errorResponse('User not found'));
		}
        return user;
	} catch (error) {
		return console.log(error);
	}
}
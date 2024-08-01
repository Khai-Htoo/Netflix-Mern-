import jwt from 'jsonwebtoken'
import { DOT_ENV } from '../config/dotEnv.js';
export const generateToken = (res,userId) => {
    const token = jwt.sign({ userId }, DOT_ENV.JWT_SECRET  );
    res.cookie('netflix-tk',token,{
        maxAge : 15*24*60*60*1000,
        httpOnly : true,
        sameSite : 'strict',
        secure : DOT_ENV.NODE_ENV != 'development'
     })
     return token;
}
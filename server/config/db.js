import mongoose from "mongoose";
import { DOT_ENV } from "./dotEnv.js";
export const ConnectDb = () => {
    mongoose.connect(DOT_ENV.MONGO_URL).then(()=>console.log('Mongo connected'));
}
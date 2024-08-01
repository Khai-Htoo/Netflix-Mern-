import env from 'dotenv/config'
export const DOT_ENV =  {
    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    NODE_ENV : process.env.NODE_ENV,
    MOVIE_API_KEY : process.env.MOVIE_API_KEY
}
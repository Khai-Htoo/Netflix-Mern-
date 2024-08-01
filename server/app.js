import express from 'express'
import { DOT_ENV } from './config/dotEnv.js'
import { ConnectDb } from './config/db.js'
import cookieParser from 'cookie-parser'
import AuthRoute from './routes/auth.route.js'
import MovieRoute from './routes/movie.route.js'
import TvRoute from './routes/tv.route.js'
import SearchRoute from './routes/search.route.js'
import { authMiddleware } from './middleware/auth.middleware.js'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.listen(DOT_ENV.PORT,() => console.log(`Server is running at ${DOT_ENV.PORT}`))
ConnectDb();

app.use('/api', AuthRoute)
app.use('/api/movie',authMiddleware, MovieRoute)
app.use('/api/tv',authMiddleware,TvRoute)
app.use('/api/search',authMiddleware,SearchRoute)

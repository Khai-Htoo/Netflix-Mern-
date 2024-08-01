import express from 'express'
import { MovieByCategory, MovieDetail, MovieTrailer, SimilarMovie, TrendingMovie } from '../controllers/movie.controller.js'
const router = express.Router()
  router.get('/trending',TrendingMovie)
  router.get('/:id/trailer',MovieTrailer)
  router.get('/:id/detail',MovieDetail)
  router.get('/:id/similar',SimilarMovie)
  router.get('/:category',MovieByCategory)
export default router
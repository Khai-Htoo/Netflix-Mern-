import express from 'express'
import { SimilarTv, TrendingTv, TvByCategory, TvDetail, TvTrailer } from '../controllers/tv.controller.js'

const router = express.Router()
  router.get('/trending',TrendingTv)
  router.get('/:id/trailer',TvTrailer)
  router.get('/:id/detail',TvDetail)
  router.get('/:id/similar',SimilarTv)
  router.get('/:category',TvByCategory)
export default router
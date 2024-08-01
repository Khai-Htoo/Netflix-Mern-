import express from 'express'
import { searchPerson , searchMovie , searchTv } from '../controllers/search.controller.js'
const router = express.Router()
  router.get('/movie/:query',searchMovie)
  router.get('/person/:query',searchPerson)
  router.get('/tv/:query',searchTv)

export default router
import { fetchMovie } from "../services/movieDb.service.js"
import { successResponse } from "../utils/customResponse.js";

export const TrendingMovie = async(req, res) => {
   const data = await fetchMovie('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
   const randomData = data.results[Math.floor(Math.random() * data.results.length)] 
   return res.status(200).json(successResponse('success fetched trending movie',randomData))
}

export const MovieTrailer = async (req,res) => {
    const {id} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    return res.status(200).json(successResponse('success fetched movie trailer',data))
}

export const MovieDetail = async(req,res) => {
    const {id} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    return res.status(200).json(successResponse('success fetched movie detail',data))
}

export const SimilarMovie = async(req,res) => {
    const {id} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    return res.status(200).json(successResponse('success fetched similar movie ',data))
}

export const MovieByCategory = async(req,res) => {
    const {category} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    return res.status(200).json(successResponse('success fetched  movie by category ',data))
}
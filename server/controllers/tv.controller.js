import { fetchMovie } from "../services/movieDb.service.js"
import { successResponse } from "../utils/customResponse.js";

export const TrendingTv = async(req, res) => {
   const data = await fetchMovie('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
   const randomData = data.results[Math.floor(Math.random() * data.results?.length)] 
   return res.status(200).json(successResponse('success fetched trending tv',randomData))
}

export const TvTrailer = async (req,res) => {
    const {id} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
    return res.status(200).json(successResponse('success fetched tv trailer',data))
}

export const TvDetail = async(req,res) => {
    const {id} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
    return res.status(200).json(successResponse('success fetched tv detail',data))
}

export const SimilarTv = async(req,res) => {
    const {id} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
    return res.status(200).json(successResponse('success fetched similar tv ',data))
}

export const TvByCategory = async(req,res) => {
    const {category} = req.params
    const data = await fetchMovie(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
    return res.status(200).json(successResponse('success fetched  tv by category ',data))
}
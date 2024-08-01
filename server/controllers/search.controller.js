import UserModel from "../models/user.model.js"
import { fetchMovie } from "../services/movieDb.service.js"
import { errorResponse, successResponse } from "../utils/customResponse.js"

export const searchPerson = async (req,res) => {
    const {query} = req.params
    const {results} = await fetchMovie(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
    if(results.length < 1){
        return res.json(errorResponse('Not found'))
    }
    await UserModel.findByIdAndUpdate(req.user._id ,{
        $push : {
            searchRecord : {
                id : results[0].id,
                image :  results[0].profile_path,
                name :  results[0].name,
                searchType : "person",
                createdAt : Date.now()
            }
        }
    })
    return res.json(successResponse('success search person', results))
}

export const searchTv = async (req,res) => {
    const {query} = req.params
    const {results} = await fetchMovie(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
    if(results.length < 1){
        return res.json(errorResponse('Not found'))
    }
    await UserModel.findByIdAndUpdate(req.user._id ,{
        $push : {
            searchRecord : {
                id : results[0].id,
                image :  results[0].poster_path,
                name :  results[0].name,
                searchType : "tv",
                createdAt : Date.now()
            }
        }
    })
    return res.json(successResponse('success search tv', results))
}

export const searchMovie = async (req,res) => {
const {query} = req.params
const {results} = await fetchMovie(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
if(results.length < 1){
    return res.json(errorResponse('Not found'))
}
await UserModel.findByIdAndUpdate(req.user._id ,{
    $push : {
        searchRecord : {
            id : results[0].id,
            image :  results[0].poster_path,
            title :  results[0].title,
            searchType : "movie",
            createdAt : Date.now()
        }
    }
})
return res.json(successResponse('success search movie', results))
}
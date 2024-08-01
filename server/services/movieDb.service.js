import { DOT_ENV } from "../config/dotEnv.js";
import axios from 'axios'
export const  fetchMovie = async (url) => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${DOT_ENV.MOVIE_API_KEY}`
        }
      };
      const response = await axios.get(url,options)
      if(response.status != 200){
         throw new Error('Fail to fetch Movie API', res.statusText);
      }
      return response.data
    } catch (error) {
       console.log(error);
    }
}


  
// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
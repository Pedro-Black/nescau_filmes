import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmUxZjE0YzYyZTQzOWIwMjM4MDJkNTE0ZWZjMjdjNSIsInN1YiI6IjY1MDg5YTU1NDJkOGE1MDEzODliNGM0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUIY0vNhpSOb1uS96BLUFvsxx4l6wSNfRO_sClDFpj4`
  }
})

export default api
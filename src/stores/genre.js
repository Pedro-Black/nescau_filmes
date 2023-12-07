import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useGenreStore = defineStore('genre', () => {
  const state = reactive({
    movie_genres: [],
    tv_genres: [],
    currentGenreId: null
  })

  const currentGenreId = computed(() => state.currentGenreId)
  const tv_genres = computed(() => state.tv_genres)
  const movie_genres = computed(() => state.movie_genres)

  const getMovieGenreName = (id) => state.movie_genres.find((genre) => genre.id === id).name
  const getTvGenreName = (id) => state.tv_genres.find((genre) => genre.id === id).name

  const getAllGenres = async () => {
    let response = await api.get(`genre/movie/list?language=pt-BR`)
    state.movie_genres = response.data.genres
    response = await api.get(`genre/tv/list?language=pt-BR`)
    state.tv_genres = response.data.genres
  }

  const setCurrentGenreId = (genreId) => {
    state.currentGenreId = genreId;
  };  

  return {
    tv_genres,
    movie_genres,
    getAllGenres,
    getMovieGenreName,
    getTvGenreName,
    currentGenreId,
    setCurrentGenreId,
  };
  
})

export default useGenreStore

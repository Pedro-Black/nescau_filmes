import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    movie: {},
    tv: {},
    movieTrailer: '',
    tvTrailer: '',
    mediaType: '',
  })

  const movie = computed(() => state.movie)
  const tv = computed(() => state.tv)
  const movieTrailer = computed(() => state.movieTrailer)
  const tvTrailer = computed(() => state.tvTrailer)
  const mediaType = computed(() => state.mediaType)

  const getMovie = async (id) => {
    const response = await api.get(`movie/${id}?language=pt-BR`)
    state.movie = response.data
    state.mediaType = 'movie'
    const trailerResponse = await api.get(`movie/${id}/videos?language=pt-BR`)
    if (trailerResponse.data.results.length > 0) state.movieTrailer = trailerResponse.data.results[0].key
    else state.movieTrailer = ''
  }

  const getTv = async (id) => {
    const response = await api.get(`tv/${id}?language=pt-BR`)
    state.tv = response.data
    state.mediaType = 'tv'
    const trailerResponse = await api.get(`tv/${id}/videos?language=pt-BR`)
    if (trailerResponse.data.results.length > 0) state.tvTrailer = trailerResponse.data.results[0].key
    else state.tvTrailer = ''
}


  return {
    movie,
    tv,
    getMovie,
    getTv,
    movieTrailer,
    tvTrailer,
    mediaType,
  }
})

export default useMovieStore

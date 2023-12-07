<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import useGenreStore from '@/stores/genre';
import useMovieStore from '@/stores/movie';
import { useRouter } from 'vue-router';

const router = useRouter();
const movieStore = useMovieStore();
const genreStore = useGenreStore();

const isLoading = ref(false);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const movies_one = ref([]);
const movies_two = ref([]);
const series_one = ref([]);
const series_two = ref([]);

const listMovies = async () => {
    isLoading.value = true;
    let response = await api.get(`discover/movie`, {
        params: {
            language: 'pt-BR',
        },
    });
    movies_one.value = response.data.results;
    response = await api.get(`discover/movie`, {
        params: {
            language: 'pt-BR',
        },
    });
    movies_two.value = response.data.results;
    response = await api.get(`discover/tv`, {
        params: {
            language: 'pt-BR',
        },
    });
    series_one.value = response.data.results;
    response = await api.get(`discover/tv`, {
        params: {
            language: 'pt-BR',
        },
    });
    series_two.value = response.data.results;
    isLoading.value = false;
};

const changeMedia = async (id, type) => {
  if (type == 'movie') await movieStore.getMovie(id);
  else await movieStore.getTv(id);
  router.push('/filme');
}


onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres();
    listMovies()
    isLoading.value = false;
});

</script>

<template>
  <div>
    <h1>Home</h1>
  </div>
  <loading v-model:active="isLoading" is-full-page />
  <div class="movie-list">
    <div v-for="movie in movies_one" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="changeMedia(movie.id, 'movie')"/>
      <div class="movie-details">
        <p class="movie-title" @click="changeMedia(movie.id, 'movie')">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id">
            {{ genreStore.getMovieGenreName(genre_id) }}
          </span>

        </p>

      </div>

    </div>
  </div>
  <div class="movie-list">
    <div v-for="movie in series_one" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.name" @click="changeMedia(movie.id, 'tv')"/>
      <div class="movie-details">
        <p class="movie-title" @click="changeMedia(movie.id, 'tv')">{{ movie.name }}</p>
        <p class="movie-release-date">{{ formatDate(movie.first_air_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id">
            {{ genreStore.getTvGenreName(genre_id) }}
          </span>
          
        </p>
        
      </div>
      
    </div>
  </div>
  <div class="movie-list">
    <div v-for="movie in movies_two" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="changeMedia(movie.id, 'movie')"/>
      <div class="movie-details">
        <p class="movie-title" @click="changeMedia(movie.id, 'movie')">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id">
            {{ genreStore.getMovieGenreName(genre_id) }}
          </span>

        </p>

      </div>

    </div>
  </div>
  <div class="movie-list">
    <div v-for="movie in series_two" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.name" @click="changeMedia(movie.id ,'tv')"/>
      <div class="movie-details">
        <p class="movie-title" @click="changeMedia(movie.id, 'tv')">{{ movie.name }}</p>
        <p class="movie-release-date">{{ formatDate(movie.first_air_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id">
            {{ genreStore.getTvGenreName(genre_id) }}
          </span>

        </p>

      </div>

    </div>
  </div>
</template>

<style scoped>

h1 {
    text-align: center;
    width: 100%;
    margin-top: 1rem;
    background-color: rgb(24, 24, 24);
    color: #fff;
    padding: 0.3rem;
}

.movie-list {
  display: flex;
  gap: 1rem;
  width: 100%;
  overflow-x: scroll;
  padding: 1rem;
  margin-bottom: 5rem;
  margin-top: 5rem;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
  cursor: pointer;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  cursor: pointer;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.movie-genres span {
  background-color: rgb(24, 24, 24);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

</style>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import useGenreStore from '@/stores/genre';
import useMovieStore from '@/stores/movie';
import { useRouter } from 'vue-router';

const genreStore = useGenreStore();
const movieStore = useMovieStore();
const router = useRouter();

const isLoading = ref(false);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const movies = ref([]);

const listMovies = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR',
        },
    });
    movies.value = response.data.results;
    isLoading.value = false;
};

const changeMedia = async (id) => {
  await movieStore.getTv(id);
  router.push('/filme');
}


onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres();
    listMovies(10759)
    isLoading.value = false;
});

</script>
<template>
    <h1>Televisão</h1>
    <ul class="genre-list">
        <li v-for="genre in genreStore.tv_genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
            :class="{ active: genre.id === genreStore.currentGenreId }">

            {{ genre.name }}

        </li>


    </ul>
    <loading v-model:active="isLoading" is-full-page />
    <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card" >

            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.name" @click="changeMedia(movie.id)"/>
            <div class="movie-details">
                <p class="movie-title" @click="changeMedia(movie.id)">{{ movie.name }}</p>
                <p class="movie-release-date">{{ formatDate(movie.first_air_date) }}</p>
                <p class="movie-genres">
                    <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)"
                        :class="{ active: genre_id === genreStore.currentGenreId }">
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
.genre-list {
  display: flex;
  overflow-x: scroll;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
  padding: 1rem;
}

.genre-item {
  background-color: rgb(24, 24, 24);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  transition: all 0.2s ease-in-out;
  height: 2rem;
  max-width: 20rem;
  flex: 0 0 auto;
}

.genre-item:hover {
  cursor: pointer;
  background-color: rgb(59, 59, 59);
  box-shadow: 0 0 0.5rem #333535;
  transform: scale(1.1);
  color: white;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #363636;
}

.movie-card img {
  width: 100%;
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

.movie-genres span:hover {
  cursor: pointer;
  background-color: rgb(32, 32, 32);
  box-shadow: 0 0 0.5rem #000000;
  transform: scale(1.1);
}

.active {
  background-color: rgb(255, 255, 255);
  font-weight: bolder;
  color: black;
  box-shadow: 1px 1px 5px rgb(73, 73, 73);
}

.movie-genres span.active {
  background-color: rgb(255, 255, 255);
  color: #000;
  font-weight: bolder;
  box-shadow: 1px 1px 5px rgb(73, 73, 73);
}
</style>

  

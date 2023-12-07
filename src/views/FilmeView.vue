<script setup>
import { ref, onMounted } from 'vue'
import Loading from 'vue-loading-overlay'
import useGenreStore from '@/stores/genre';
import useMovieStore from '@/stores/movie';

const genreStore = useGenreStore();
const movieStore = useMovieStore();
const mediaType = movieStore.mediaType;

const isLoading = ref(false);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const media = ref('')

const mediaTrailer = ref('')

onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres();
    if (movieStore.mediaType == 'movie') media.value = movieStore.movie;
    else media.value = movieStore.tv;

    if (movieStore.mediaType == 'movie') mediaTrailer.value = movieStore.movieTrailer;
    else mediaTrailer.value = movieStore.tvTrailer;

    isLoading.value = false;
});

</script>
<template>
    <div class="movie">
        <Loading v-model:active="isLoading" is-full-page />
        <div class="movieContainer">
            <h1 v-if="mediaType == 'movie'">{{ media.title }}</h1>
            <h1 v-else>{{ media.name }}</h1>
            <div class="imgTrailer" v-if="mediaType == 'movie'">
                <img :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`" :alt="media.title" />
                <iframe v-if="mediaTrailer !== ''" width="800" height="450"
                    :src="`https://www.youtube.com/embed/${mediaTrailer} `" title="YouTube video player"
                    frameborder="0"></iframe>
            </div>
            <div class="imgTrailer" v-else>
                <img :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`" :alt="media.name" />
                <iframe v-if="mediaTrailer !== ''" width="800" height="450"
                    :src="`https://www.youtube.com/embed/${mediaTrailer} `" title="YouTube video player"
                    frameborder="0"></iframe>
            </div>
            <p class="movie-release-date" v-if="mediaType == 'movie'">Lançamento: {{ formatDate(media.release_date) }}</p>
            <p class="movie-release-date" v-else>Lançamento: {{ formatDate(media.first_air_date) }}</p>
            <p class="movie-rating">Nota Média: {{ media.vote_average }}</p>
            <p class="movie-overview">{{ media.overview }}</p>
        </div>
    </div>
</template>

<style scoped>
.movie {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
}

.imgTrailer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

.movieContainer {
    width: 80%;
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(24, 24, 24);
    color: white;
    padding: 2rem;
}

.movie img {
    width: 300px;
    height: 400px;
}

.movie iframe {
    margin-top: 20px;
}

.movie p {
    margin-top: 20px;
}

.movie p.movie-overview {
    width: 500px;
    text-align: center;
}

.movie p.movie-rating {
    font-size: 20px;
}

.movie p.movie-release-date {
    font-size: 20px;
}

.movie h1 {
    text-align: center;
    width: 100%;
    margin-top: 1rem;
    background-color: rgb(24, 24, 24);
    color: #fff;
    padding: 0.3rem;
}
</style>

  

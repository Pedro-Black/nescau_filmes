<script setup>
</script>

<template>
  <header>
    <h1>Nescau Filmes</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>


<style scoped>

h1 {
  position: absolute;
  left: 1rem;
  margin-right: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
}

header {
  height: 3rem;
  display: flex;
  background-color: rgb(24, 24, 24);
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
  justify-content: center;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
  background-color: rgb(32, 32, 32);
  padding: 7px;
  border-radius: 16px;
  transition: all 0.2s ease-in-out;
  font-size: medium;
}

nav a:hover {
  transform: scale(1.1);
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 5px rgb(31, 31, 31);
  color: black;
}
</style>


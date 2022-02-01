<template>
  <header>
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="">
    </div>
    <nav>
      <ul>
        <li v-for="link in links"><RouterLink :to="link.url">{{ link.name }}</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

interface Link {
  name: string
  url: string
}

@Component
export default class Header extends Vue {

  links: Link[] = [
    {
      name: 'Главная',
      url: '/'
    },
    {
      name: 'Каталог',
      url: '/collection'
    }
  ]

}
</script>

<style scoped>
header {
  width: 1200px;
  margin: 0 auto 0 auto;
  display: flex;
  column-gap: 100px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;
}

nav ul {
  display: flex;
  padding: 0;
  list-style-type: none;
  margin-top: 40px;
  justify-content: space-between;
  width: 200px;
}

nav ul li a {
  text-decoration: none;
  color: #000;
  font-size: 20px;
}

nav ul li a:hover {
  color: #6b0000;
}

img {
  height: 100px;
}
</style>

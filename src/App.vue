<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {



}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: Montserrat,serif;
  background-image: url("assets/img/bg.jpg");
  background-repeat: repeat-y;
  background-position-x: center;
  background-size: cover;
}
</style>

<style scoped>
main {
  padding: 20px;
  width: 1200px;
  background-color: white;
  border-radius: 10px;
  margin: 20px auto 50px auto;
}
</style>

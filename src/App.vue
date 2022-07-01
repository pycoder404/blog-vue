<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div id="app">
        <router-view></router-view>
    </div>

</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 5px 5px auto;
  height: 100vh;
}
</style>

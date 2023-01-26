<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #41B883;
  margin-top: 60px;
  font-size: 18px;
}
.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    padding: 10px;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created: function(){
    this.$router.push('/allMoviePage')
  }
}
</script>

<style>
@import './assets/reset.css';

#app {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>

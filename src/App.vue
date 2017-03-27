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
 //  mounted: function(){

 //  }
}
</script>

<style>
@import './assets/reset.css';

#app {

}
</style>

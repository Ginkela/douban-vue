<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>

<style>
@import './assets/reset.css';

#app {

}
.loader{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%)
	}
</style>

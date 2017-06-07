<template>
	<div>
		<navbarHead></navbarHead>
		<sync-loader :loading="loading" class="loader"></sync-loader>
		<div class="commingSoon-wrapper" v-if="!loading">
			<h1>即将上映</h1>
			<div class="commingSoon-content">
				<ul>
					<li v-for="item in commingSoon">
						<movie :item="item" type="commingSoon"></movie>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarHead from '@/components/header/header';
	import movie from '@/components/movie'
	import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
	export default{
		data(){
			return{
				loading: true,
				commingSoon: []
			}
		},
		components: {
			navbarHead,
			movie,
			SyncLoader
		},
		mounted() {
			// if(this.$store.getters.get_commingSoon.length == 0){
			this.$http.jsonp("http://api.douban.com/v2/movie/coming_soon?count=18")
				.then(res => {
					this.commingSoon = res.body.subjects;
					this.$store.dispatch('get_commingSoon_data',res.body.subjects);
					this.commingSoon = this.$store.getters.get_commingSoon;
					this.loading = false;
				}).catch(res => {
					console.log(res);
				})
			// }else{
			// 	this.commingSoon = this.$store.getters.get_commingSoon;
			// }
		},
		methods: {

		}
	}
</script>

<style scoped>
	.commingSoon-wrapper{
		max-width: 600px;
		margin: 0 auto;
	}
	h1{
		font-size: 20px;
		padding: 10px 20px;
		font-weight: normal;
	}
	h3,h4{
		font-weight: normal;
	}
	.commingSoon-content ul{
		text-align: center;
	}
	.commingSoon-content ul li{
		display: inline-block;
		margin: 5px 10px;
	}
	.commingSoon-content ul li{
		width: 100px;
	}
	.commingSoon-content ul li h3{
		white-space:nowrap; 
		text-overflow:ellipsis;
		overflow: hidden;
	}
	.commingSoon-content ul li img{
		height: 143px;
		max-width: 100px;
	}
</style>
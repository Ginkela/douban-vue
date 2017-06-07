<template>
	<div>
		<navbarHead></navbarHead>
		<sync-loader :loading="loading" class="loader"></sync-loader>
		<div class="inTheaters-wrapper" v-if="!loading">
			<h1>影院热映</h1>
			<div class="inTheaters-content">
				<ul>
					<li v-for="item in inTheaters">
						<movie :item="item" type="inTheaters"></movie>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarHead from '@/components/header/header';
	import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
	import movie from '@/components/movie'
	export default{
		data(){
			return{
				loading: true,
				inTheaters: []
			}
		},
		components: {
			navbarHead,
			movie,
			SyncLoader
		},
		mounted() {
			// if(this.$store.getters.get_inTheaters.length == 0){
				this.$http.jsonp("http://api.douban.com/v2/movie/in_theaters?count=18")
				.then(res => {
					this.inTheaters = res.body.subjects;
					this.$store.dispatch('get_inTheaters_data',res.body.subjects);
					this.inTheaters = this.$store.getters.get_inTheaters;
					this.loading = false;
				}).catch(res => {
					console.log(res);
				})
			// }else{
			// 	this.inTheaters = this.$store.getters.get_inTheaters;
			// }
		},
		methods: {
			movie_click: function(event){		
				this.$router.push('/movieInfo'+event.currentTarget.id);
			}
		}
	}
</script>

<style scoped>
	.inTheaters-wrapper{
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
	.inTheaters-content ul{
		text-align: center;
	}
	.inTheaters-content ul li{
		display: inline-block;
		margin: 5px 10px;
	}
	.inTheaters-content ul li{
		width: 100px;
	}
	.inTheaters-content ul li h3{
		white-space:nowrap; 
		text-overflow:ellipsis;
		overflow: hidden;
	}
	.inTheaters-content ul li img{
		height: 143px;
		max-width: 100px;
	}
</style>
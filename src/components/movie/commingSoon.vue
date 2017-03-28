<template>
	<div>
		<navbarHead></navbarHead>
		<div class="commingSoon-wrapper">
			<h1>即将上映</h1>
			<div class="commingSoon-content">
				<ul>
					<li v-for="item in commingSoon">
						<div class="movie-content" :id="item.id">
							<img :src="item.images.medium" alt="item.images.alt">
							<h3>{{ item.title }}</h3>
<!-- 								<star-rating><star-rating> -->
							<h4 v-if="item.rating.average != 0">{{ item.rating.average }}</h4>
							<h4 v-if="item.rating.average == 0">暂无评分</h4>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarHead from '../header/header';

	export default{
		data(){
			return{
				loading: true,
				commingSoon: []
			}
		},
		components: {
			navbarHead
		},
		mounted() {
			if(this.$store.getters.get_commingSoon.length == 0){
			this.$http.jsonp("http://api.douban.com/v2/movie/coming_soon?count=18")
				.then(res => {
					this.commingSoon = res.body.subjects;
					this.$store.dispatch('get_commingSoon_data',res.body.subjects);
					this.commingSoon = this.$store.getters.get_commingSoon;
				}).catch(res => {
					console.log(res);
				})
			}else{
				this.commingSoon = this.$store.getters.get_commingSoon;
			}
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
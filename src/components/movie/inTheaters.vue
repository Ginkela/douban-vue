<template>
	<div>
		<navbarHead></navbarHead>
		<div class="inTheaters-wrapper">
			<h1>影院热映</h1>
			<div class="inTheaters-content">
				<ul>
					<li v-for="item in inTheatersShow">
						<div class="movie-content" :id="item.id">
							<img :src="item.images.medium" alt="item.images.alt">
							<h3>{{ item.title }}</h3>
<!-- 								<star-rating><star-rating> -->
							<h4>{{ item.rating.average }}</h4>
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
				inTheaters: [],
				inTheatersShow: []
			}
		},
		components: {
			navbarHead
		},
		mounted() {
			this.$http.jsonp("http://api.douban.com/v2/movie/in_theaters")
				.then(res => {
					this.inTheaters = res.body.subjects;
					this.inTheatersShow = this.inTheaters.slice(0, 18);
				}).catch(res => {
					console.log(res);
				})
		}
		// methods: {

		// }
	}
</script>

<style>
	.inTheaters-wrapper{
		max-width: 600px;
		margin: 0 auto;
	}
	h1{
		font-size: 20px;
		padding: 10px 20px;
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
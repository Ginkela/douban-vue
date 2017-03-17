<template>
	<div>
<!-- 		<spinner></spinner> -->
		<navbarHead></navbarHead>
		<div class="card">
			<div class="movie-showing">
				<header>
					<h2>影院热映</h2>
					<div>更多</div>
				</header>
				<div class="section-content">
					<ul v-for="item in inTheatersSimple">
						<li>
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
			<div class="movie-showing">
				<header>
					<h2>即将上映</h2>
					<div>更多</div>
				</header>
				<div class="section-content">
					<ul v-for="item in commingSoonSimple">
						<li>
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
	</div>
</template>

<script>
	import navbarHead from '../header/header';
	// import spinner from '../spinner/spinner'
	export default{
		data () {
			return {
				loading: true,
				inTheaters: [],
				inTheatersSimple: [],
				commingSoon: [],
				commingSoonSimple: []
			}
		},
		components: {
			navbarHead
			// star-rating
		},
		mounted () {
			this.$http.jsonp("http://api.douban.com/v2/movie/in_theaters")
				.then(res => {
					this.inTheaters = res.body.subjects;
					this.inTheatersSimple = this.inTheaters.slice(0,6);
				}).catch(res => {
					console.log(res);
				})
			this.$http.jsonp("http://api.douban.com/v2/movie/coming_soon")
				.then((res)=>{
					this.commingSoon = res.body.subjects;
					this.commingSoonSimple = this.commingSoon.slice(0,6);
				}).catch(res => {
					console.log(res);
				})
		},
		methods () {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.card{
		max-width: 650px;
		margin: 0 auto;
	}
	.movie-showing{
		width: 100%;
	}
	.movie-showing header{
		padding: 10px 20px;
		overflow: hidden;
	}
	.movie-showing header h2{
		font-size: 1.06rem;
		font-weight: normal;
		float: left;
	}
	.movie-showing header div{
		float: right;
		font-size: .9rem;
		color: #42bd56;
		cursor: pointer;
	}
	.movie-showing .section-content{
		min-width:650px; 
	}
	.movie-showing .section-content ul{
		display: inline-block;
	}
	.movie-showing .section-content ul li{
		margin-left: 0.48rem;
	}
	.movie-content{
		cursor: pointer;
	}
	.movie-content img{
		height: 143px;
	}
	.movie-content h3{
		margin-top: 5px;
		font-size: 15px;
		font-weight: normal;
		text-align: center;
	}
	.movie-content h4{
		font-size: 10px;
		font-weight: normal;
		text-align: center;
		color: #aaa;
	}
</style>
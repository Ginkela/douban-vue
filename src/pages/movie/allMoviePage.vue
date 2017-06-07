<template>
	<div>
		<navbarHead></navbarHead>
		<sync-loader :loading="loading" class="loader"></sync-loader>
		<div class="card" v-if="!loading">
			<div class="movie-showing">
				<header>
					<h2>影院热映</h2>
					<div @click="inTheaters_click">更多</div>
				</header>
				<div class="section-content">
					<ul>
						<li v-for="item in inTheaters">
							<movie :item="item" type="inTheaters"></movie>
						</li>
					</ul>
				</div>
			</div>
			<div class="movie-showing">
				<header>
					<h2>即将上映</h2>
					<div @click="commingSoon_click">更多</div>
				</header>
				<div class="section-content">
					<ul>
						<li v-for="item in commingSoon">
							<movie :item="item" type="commingSoon"></movie>
						</li>
					</ul>
				</div>
			</div>
			<div class="find-movie">
				<header>
					<h2>发现好电影</h2>
				</header>
				<div class="type-content">
					<!--<div class="movie-type" type="weekly" @click="movieType_click">
						口碑榜
					</div>-->
					<div class="movie-type" type="top250" @click="movieType_click">
						豆瓣高分电影
					</div>
					<div class="movie-type" type="us_box" @click="movieType_click">
						北美票房榜
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarHead from '@/components/header/header';
	import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
	import movie from '@/components/movie'
	export default{
		data () {
			return {
				loading: true,
				inTheaters: [],
				commingSoon: []
			}
		},
		components: {
			navbarHead,
			SyncLoader,
			movie
		},
		mounted() {
			// if(this.$store.getters.get_inTheaters.length == 0){
				this.$http.jsonp("http://api.douban.com/v2/movie/in_theaters?count=6")
					.then(res => {
						this.inTheaters = res.body.subjects;
						this.loading = false;
					}).catch(res => {
						alert(res.error);
					})
			// }else{
			// 	this.inTheaters = this.$store.getters.get_inTheaters.slice(0,6);
			// }
			// if(this.$store.getters.get_commingSoon.length == 0){
				this.$http.jsonp("http://api.douban.com/v2/movie/coming_soon?count=6")
					.then(res=>{
						this.commingSoon = res.body.subjects;
						this.loading = false;
					}).catch(res => {
						alert(res.error);
					})
			// }else{
			// 	this.commingSoon = this.$store.getters.get_commingSoon.slice(0,6);
			// }
		},
		methods: {
			inTheaters_click: function(){
				this.$router.push('/inTheaters');
			},
			commingSoon_click: function(){
				this.$router.push('/commingSoon');
			},
			movieType_click: function(event){
				let type = event.currentTarget.getAttribute("type");
				this.$router.push('/'+type);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.card{
		max-width: 660px;
		margin: 0 auto;
	}

	header{
		padding: 10px 20px 10px 10px;
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
		height: 200px;
		overflow: hidden;
	}
	.movie-showing .section-content ul{
		height: 220px;
		font-size: 0;
		white-space: nowrap;
		overflow-x: auto;
	}
	.movie-showing .section-content ul li{
		margin-left: 0.48rem;
		display: inline-block;
	}
	.movie-showing .section-content ul li:last-child{
		margin-right: 0.48rem;
	}
	.find-movie h2{
		font-size: 1.06rem;
		font-weight: normal;
	}
	.find-movie .movie-type{
		border: 1px solid;
		float: left;
		padding: 8px 30px;
		margin: 10px 2.5%;
		border-radius: 5px;
		font-size: 15px;
	}
	.find-movie .movie-type:nth-child(4n-3){
		border-color: #66aaef;
		color: #66aaef;
	}
	.find-movie .movie-type:nth-child(4n-2){
		border-color: #ffac2d;
		color: #ffac2d;
	}
	.find-movie .movie-type:nth-child(4n-1){
		border-color: #64c975;
		color: #64c975;
	}
	.find-movie .movie-type:nth-child(4n){
		border-color: #ff4055;
		color: #ff4055;
	}
</style>
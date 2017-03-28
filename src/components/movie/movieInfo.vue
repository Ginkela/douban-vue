<template>
	<div>
		<navbarHead></navbarHead>
		<div class="movieInfo-wrapper">
			<div class="info-top">
				<img :src="movieInfo.images.medium" :alt="movieInfo.alt">
				<div class="info-content">
					<h1>{{movieInfo.title}}({{movieInfo.original_title}})</h1>
					<p>用户评分 {{movieInfo.rating.average}} ({{movieInfo.ratings_count}}人评分）</p>
					<!-- <star-rating><star-rating> -->
					<p><span v-for="item in movieInfo.genres">{{item}} </span></p>
					<p><span v-for="item in movieInfo.countries">{{item}} </span>{{movieInfo.year}}</p>
				</div>
			</div>
			<div class="summary">
				<p>
					{{movieInfo.summary}}
				</p>
			</div>
			<div class="casts">
				<ul>
					<li v-for="item in movieInfo.directors" :id="item.id">
						<img :src="item.avatars.small" :alt="item.alt">
						<p>{{item.name}}</p>
						<p>导演</p>
					</li>
					<li v-for="item in movieInfo.casts" :id="item.id">
						<img :src="item.avatars.small" :alt="item.alt">
						<p>{{item.name}}</p>
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
				movieInfo:{
					images:{
						large: '',
						medium: '',
						small: ''
					},
					alt: '',
					rating: {
						average: '',
					}
				}
			}
		},
		components:{
			navbarHead
		},
		mounted(){
			var id = this.$store.getters.get_movieId;
			this.$http.jsonp("http://api.douban.com/v2/movie/subject/"+id)
				.then((res)=>{
					this.movieInfo = res.body;
				}).catch((res)=>{
					console.log(res);
				})
		},
		methods:{

		}
	}
</script>

<style scoped>
	.movieInfo-wrapper{
		padding: 10px;
	}
	.info-top{
		overflow: hidden;
		margin-bottom: 15px;
	}
	.info-top img{
		float: left;
	}
	.info-top h1{
		font-size: 15px;
	}
	.info-top .info-content{
		float: left;
		margin-left: 10px;
	}
	.info-top .info-content>*{
		margin-bottom: 3px;
	}
	.summary{
		margin-bottom: 15px;    
	}
	.casts{
		white-space:nowrap;
		overflow: hidden;      
		text-align: center;
		height: 140px;
		margin-bottom: 15px;
	}
	.casts ul{
		overflow-x: scroll;
		height: 160px;
		font-size: 0px;
	}
	.casts ul li{
		display: inline-block;
		max-width: 70px;
		font-size: 5px;
		vertical-align: top;
	}
	.casts ul li p{
		white-space:nowrap;
		overflow:hidden;      
		text-overflow:ellipsis; /*超出部分显示省略号*/
	}
</style>
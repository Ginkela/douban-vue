<template>
	<div>
		<navbarHead></navbarHead>
		<sync-loader :loading="loading" class="loader"></sync-loader>
		<div class="movieInfo-wrapper" v-if="!loading">
			<div class="info-top">
				<img :src="movieInfo.images.medium" :alt="movieInfo.alt">
				<div class="info-content">
					<h1>{{movieInfo.title}}({{movieInfo.original_title}})</h1>
					<p>用户评分 {{movieInfo.rating.average}} ({{movieInfo.ratings_count}}人评分)</p>
					<star :average="movieInfo.rating.average"></star>
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
					<li v-for="value in movieInfo.casts" :id="value.id">
						<img :src="value.avatars.small" :alt="value.alt">
						<p>{{value.name}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import navbarHead from '@/components/header/header';
	import star from '@/components/rating/rating'
	import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
	export default{
		data(){
			return{
				image: '',
				loading: true,
				movieInfo:{
					images:{
						large: '',
						medium: '',
						small: ''
					},
					alt: '',
					rating: {
						average: '',
					},
					directors:{
						avatars:{
							small: 'www.baidu.com'
						}
					}
				}
			}
		},
		components:{
			navbarHead,
			star,
			SyncLoader
		},
		mounted(){
			var id = this.$route.params.id;
			this.$http.jsonp("http://api.douban.com/v2/movie/subject/"+id)
				.then((res)=>{
					this.movieInfo = res.body;
					console.log(this.movieInfo.directors)
					this.loading = false;
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
		margin-left: 110px;
	}
	.info-top .info-content>*{
		margin-bottom: 3px;
	}
	.summary{
		margin-bottom: 15px; 
		font-size: 13px;   
	}
	.casts{
		white-space:nowrap;
		overflow: hidden;      
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
		margin-right: 10px;
	}
	.casts ul li:last-child{
		margin-right: 0;
	}
	.casts ul li p{
		white-space:nowrap;
		overflow:hidden;      
		text-overflow:ellipsis; /*超出部分显示省略号*/
		text-align: center;
	}
	.loader{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%)
	}
</style>
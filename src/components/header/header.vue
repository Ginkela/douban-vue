<template>
	<div>
		<div class="header">
			<div class="header-logo">
				<img src="./header-logo.png" alt="header-logo" @click="click_allMoviePage">
			</div>
			<div class="search" @click="click_search"><img src="./search-logo.png" alt="search-logo"></div>
			<ul>
				<li @click="click_allMoviePage">电影</li>
				<li>图书</li>
				<li>广播</li>
				<li>小组</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			click_search: function(){
				this.$router.push("/search");
			},
			click_allMoviePage: function(){
				this.$router.push("/allMoviePage")
			}

		}
	}
</script>

<style>
	.header{
		padding: 10px 0px;
		overflow: hidden;
		border-bottom: 1px solid #f3f3f3;
		min-width: 300px;
	}
	.header .header-logo{
		left: 10px;
		padding-left: 20px;
		cursor: pointer;
	}
	.header .header-logo img{
		width: 45px;
		float: left;
	}
	.header ul{
		float: right;
		color: green;
		font-size: 0px;
		line-height: 20px;
		margin-right: 10px;
	}
	.header ul li{
		display: inline-block;
		font-size: 15px;
		margin: 0 10px;
		cursor: pointer;
	}
	.header ul li:nth-child(1){
		color: blue;
	}
	.header ul li:nth-child(2){
		color: brown;
	}
	.header .search{
		padding:0 20px;
		cursor: pointer;
	}
	.header .search img{
		float: right;
		width: 25px;
		margin-top: 3px;
	}
</style>
<template>
    <div class="movie-content" :id="item.id" @click="movie_click">
        <img :src="item.images.medium" :alt="item.images.alt">
        <h3>{{ item.title }}</h3>
        <div class="average" v-if="type != 'commingSoon'">
            <star v-if="item.rating.average != 0" :average="item.rating.average"></star>
            <h4 v-if="item.rating.average != 0">{{ item.rating.average }}</h4>
        </div>
        <h4 v-if="item.rating.average == 0 && type != 'commingSoon'">暂无评分</h4>
    </div>
</template>

<script>
    import star from '@/components/rating/rating'
    export default{
        props:['item','type'],
        components:{
            star
        },
        methods:{
            movie_click: function(event){		
				this.$router.push('/movieInfo'+event.currentTarget.id);
			}
        }
    }
</script>

<style scoped>
    .movie-content{
		cursor: pointer;
		width: 100px;
		display: inline-block;
		vertical-align: top;
	}
	.movie-content img{
		height: 143px;
		max-width: 100px;
	}
	.movie-content h3{
		margin-top: 5px;
		font-size: 15px;
		font-weight: normal;
		text-align: center;
		white-space:nowrap; 
		text-overflow:ellipsis;
		overflow: hidden;
	}
	.movie-content h4{
		font-size: 10px;
		font-weight: normal;
		text-align: center;
		color: #aaa;
	}
	.average{
		text-align: center;
	}
	.average h4{
		display: inline-block;
		vertical-align: middle;
	}
</style>
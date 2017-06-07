<template>
    <div>
        <navbarHead></navbarHead>
        <sync-loader :loading="loading" class="loader"></sync-loader>
        <h1>{{title}}</h1>
        <div class="wrapper">
            <ul>
                <li v-for="(item,index) in movie_items">
                    <div class="movie-card" :id="item.subject.id" @click="movie_click">
                        <!--<p v-if="index<3">NO.{{index+1}}</p>-->
                        <img :src="item.subject.images.medium" :alt="item.subject.alt">
                        <div class="movie-content">
                            <h2>{{item.subject.title}}</h2>
                            <p>用户评分 {{item.subject.rating.average}} ({{item.subject.collect_count}}人评分)</p>
                            <star :average="item.subject.rating.average"></star>
                            <p>上映日期：{{item.subject.year}}</p>
                            <p><span v-for="value in item.subject.genres">{{value}}  </span></p>
                            <p>{{item.subject.casts[0].name}}/{{item.subject.casts[1].name}}/{{item.subject.casts[2].name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import navbarHead from '@/components/header/header'
    import star from '@/components/rating/rating'
    import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
    export default{
        data(){
            return{
                loading:true,
                movie_items:[],
                date: '',
                title: ''
            }
        },
        components:{
            navbarHead,
            star,
            SyncLoader
        },
        mounted(){
            this.$http.jsonp("http://api.douban.com/v2/movie/us_box")
                .then(res=>{
                    this.movie_items = res.body.subjects;
                    this.date = res.body.date;
                    this.title = res.body.title
                    this.loading = false;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        methods:{
            movie_click(){
                this.$router.push('/movieInfo'+event.currentTarget.id);
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        padding: 0 20px 0 10px;
    }
    h1{
        font-size: 24px;
        text-align: center;
        padding: 10px 0 20px 0;
        font-weight: normal;
        color: #494949;
    }
    .movie-card{
        overflow: hidden;
        margin-bottom: 15px;
        border-top: 1px solid #eee;
        padding: 15px 0;
	}
    .movie-card:first-child{
        border-top: none;
    }
	.movie-card img{
		float: left;
	}
	.movie-card h2{
		font-size: 18px;
        font-weight: normal;
        line-height: 1.3;
	}
	.movie-card .movie-content{
		margin-left: 110px;
	}
	.movie-card .movie-content>*{
		margin-bottom: 3px;
	}
</style>
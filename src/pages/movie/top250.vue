<template>
    <div>
        <navbarHead></navbarHead>
        <sync-loader :loading="loading" class="loader"></sync-loader>
        <h1>豆瓣电影Top250</h1>
        <div class="wrapper">
            <ul>
                <li v-for="(item,index) in movie_items">
                    <div class="movie-card" :id="item.id" @click="movie_click">
                        <!--<p v-if="index<3">NO.{{index+1}}</p>-->
                        <img :src="item.images.medium" :alt="item.alt">
                        <div class="movie-content">
                            <h2>{{item.title}}</h2>
                            <p>用户评分 {{item.rating.average}} ({{item.collect_count}}人评分)</p>
                            <star :average="item.rating.average"></star>
                            <p>上映日期：{{item.year}}</p>
                            <p><span v-for="value in item.genres">{{value}}  </span></p>
                            <p>{{item.casts[0].name}}/{{item.casts[1].name}}/{{item.casts[2].name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="lazy-load"><pulse-loader :loading="laze_loading"></pulse-loader></div>
        </div>
    </div>
</template>

<script>
    import navbarHead from '@/components/header/header'
    import star from '@/components/rating/rating'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
    export default{
        data(){
            return{
                loading:true,
                laze_loading:false,
                movie_items:[],
                scroll: ''
            }
        },
        mounted(){
            window.addEventListener('scroll', this.lazyload);
            this.$http.jsonp("http://api.douban.com/v2/movie/top250?count=10")
                .then(res=>{
                    this.movie_items = res.body.subjects;
                    this.loading = false;
                })
                .catch(res=>{
                    console.log(res)
                })
        },
        components:{
            navbarHead,
            star,
            PulseLoader,
            SyncLoader
        },
        methods:{
            movie_click(event){		
				this.$router.push('/movieInfo'+event.currentTarget.id);
			},
            lazyload(){
                this.scroll = document.body.scrollTop;
                let divTop = document.getElementsByClassName("lazy-load")[0].offsetTop;
                let sHeight = window.screen.height
                let maxScrollTop = divTop - sHeight;
                console.log(maxScrollTop);
                if(this.scroll > maxScrollTop-10){
                    window.removeEventListener('scroll', this.lazyload);
                    this.laze_loading = true;
                    let startNum = this.movie_items.length;
                    this.$http.jsonp("http://api.douban.com/v2/movie/top250?count=10&start="+startNum)
                .then(res=>{
                    this.laze_loading = false;
                    this.movie_items = this.movie_items.concat(res.body.subjects);
                    window.addEventListener('scroll', this.lazyload);
                })
                .catch(res=>{
                    alert(res)
                })
                }
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
    .lazy-load{
        text-align: center;
    }
</style>
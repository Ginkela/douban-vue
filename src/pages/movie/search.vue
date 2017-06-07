<template>
    <div>
        <div class="head">
            <div class="close"  @click="goBack">关闭</div>
            <div class="search-content">
                <input type="text" v-model="search_value" @keydown.enter="searchMovie">
                <i @click="searchMovie"></i>
            </div>
        </div>
        <sync-loader :loading="loading" class="loader"></sync-loader>
        <div class="recently-search" v-show="show_recent&&!loading">
            最近搜索：
            <ul>
                <li v-for="value in recent_search" @click="recent_click">{{value}}</li>
            </ul>
        </div>
        <div class="result" v-if="!loading">
            <ul>
                <li v-for="item in result">
                    <movie :item="item" type="search"></movie>
                </li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
    import movie from '@/components/movie'
    export default{
        data(){
            return{
                loading: false,
                search_value: '',
                show_recent: false,
                result: [],
                recent_search:[]
            }
        },
        components:{
            SyncLoader,
            movie
        },
        methods: {
            goBack: function(){
                this.$router.push('/');
            },
            searchMovie: function(){
                this.loading = true;
                if(this.search_value){
                    let url = 'http://api.douban.com/v2/movie/search?q='+this.search_value;
                    this.$http.jsonp(url)
                        .then((res)=>{
                            this.show_recent = false;
                            this.$store.dispatch('get_recentSearch_data',this.search_value);
                            this.result = res.body.subjects;
                            this.loading = false;
                        })
                        .catch((res)=>{
                            alert(res.error);
                        })
                }
            },
            movie_click: function(){
                this.$router.push('/movieInfo'+event.currentTarget.id);
            },
            recent_click: function(){
                this.search_value = event.target.innerHTML;
                this.searchMovie();
            }
        },
        mounted(){
            this.recent_search = this.$store.getters.get_recentSearch;
            if(this.recent_search.length){
                this.show_recent = true;
            }
        }
    }
</script>

<style scoped>
    .head{
        width: 100%;
        font-size: 0px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f3f3f3;
    }
    .close{
        color: #42bd56;
        font-size: 16px;
        width: 50px;
        padding: 0 10px;
        text-align: center;
        float: left;

    }
    .search-content{
        width: 100%;
        padding-left: 70px;
        box-sizing: border-box;
        text-align: center;
        padding-right: 20px;
    }
    .search-content input{
        border: none;
        background-color: #f3f3f3;
        text-align: left;
        height: 30px;
        border-radius: 3px;
        width: 100%;
        font-size: 14px;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .search-content i{
        background: url('/static/search.png');
        background-size: 100% 100%;
        display: block;
        width: 20px;
        height: 20px;
        position: absolute;
        right: 25px;
        top: 20px;
    }
    .recently-search{
        margin-top: 10px;
        font-size: 14px;
        color: #42bd56;
        padding: 0 10px;
    }
    ul{
        font-size: 0;
    }
    ul li{
        display: inline-block;
        color: #7d7d7d;
        font-size: 14px;
        margin: 0 15px;
    }
    h1{
		font-size: 20px;
		padding: 10px 20px;
		font-weight: normal;
	}
	h3,h4{
		font-weight: normal;
	}
	.result ul{
		text-align: center;
	}
	.result ul li{
		display: inline-block;
		margin: 5px 10px;
	}
	.result ul li{
		width: 100px;
	}
	.result ul li h3{
		white-space:nowrap; 
		text-overflow:ellipsis;
		overflow: hidden;
	}
	.result ul li img{
		height: 143px;
		max-width: 100px;
	}
   
</style>
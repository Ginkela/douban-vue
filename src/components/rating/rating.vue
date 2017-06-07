<template>
    <div class="rating">
        <i v-for="item in rating_star" :class="item"></i>
    </div>
</template>

<script>
    export default{
        props:['average'],
        computed:{
            rating_star(){
                const full = 'full';
                const half = 'half';
                const empty = 'empty';
                let rating_class = [];
                let half_average = this.average/2;
                let full_star = Math.floor(half_average);
                let half_star = half_average-full_star;
                for(let i=0;i<full_star;i++){
                    rating_class.push(full);
                }
                if(half_star){
                    rating_class.push(half);
                }
                console.log(rating_class.length)
                for(let i=0,length=5-rating_class.length;i<length;i++){
                    rating_class.push(empty);
                }
                return rating_class;
            }
        }
    }
</script>

<style scoped>
    .rating{
        display: inline-block;
        vertical-align: middle;
    }
    .rating i{
        display: inline-block;
        height: 11px;
        width: 11px;
        background-size: 10px 10px;
    }
    .full{
        background-image: url(star36_on@2x.png);
        background-repeat: no-repeat;
    }
    .half{
        background-image: url(star36_half@2x.png);
        background-repeat: no-repeat;
    }
    .empty{
        background-image: url(star36_off@2x.png);
        background-repeat: no-repeat;
    }
</style>
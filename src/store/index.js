import Vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import vueResource from 'vue-resource'

Vue.use(vuex);
Vue.use(vueResource);

const state = {
	inTheaters: [],
	commingSoon: [],
	movieId : ''
}
const getters = {
	get_inTheaters(state){
		return state.inTheaters
	},
	get_commingSoon(state){
		return state.commingSoon
	},
	get_movieId(state){
		return state.movieId
	}
}

export default new vuex.Store({
	state,
	getters,
	actions,
	mutations
})
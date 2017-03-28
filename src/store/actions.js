export default{
	get_inTheaters_data({ commit }, param ){
		commit('GET_INTHEATERS_DATA', {items: param})
	},
	get_commingSoon_data({ commit }, param ){
		commit('GET_COMMINGSOON_DATA',{items: param})
	},
	get_movieId_data({ commit }, param ){
		commit('GET_MOVIEID_DATA',{items: param})
	}
}
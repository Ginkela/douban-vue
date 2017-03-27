export default{
	get_inTheaters({ commit }, param ){
		commit('GET_INTHEATERS', {items: param})
	},
	get_commingSoon({ commit }, param ){
		commit('GET_COMMINGSOON',{items: param})
	}
}
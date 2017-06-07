const GET_INTHEATERS_DATA = 'GET_INTHEATERS_DATA'
const GET_COMMINGSOON_DATA = 'GET_COMMINGSOON_DATA'
const GET_RECENTSEARCH_DATA = 'GET_RECENTSEARCH_DATA'

export default{
	[GET_INTHEATERS_DATA](state,payload){
		state.inTheaters = payload.items;
	},
	[GET_COMMINGSOON_DATA](state,payload){
		state.commingSoon = payload.items;
	},
	[GET_RECENTSEARCH_DATA](state,payload){
		if(state.recentSearch.indexOf(payload.items)<0){
			state.recentSearch.push(payload.items);
		}
	}
}
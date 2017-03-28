const GET_INTHEATERS_DATA = 'GET_INTHEATERS_DATA'
const GET_COMMINGSOON_DATA = 'GET_COMMINGSOON_DATA'
const GET_MOVIEID_DATA = 'GET_MOVIEID_DATA'

export default{
	[GET_INTHEATERS_DATA](state,payload){
		state.inTheaters = payload.items;
	},
	[GET_COMMINGSOON_DATA](state,payload){
		state.commingSoon = payload.items;
	},
	[GET_MOVIEID_DATA](state,payload){
		state.movieId = payload.items;
	}
}
const GET_INTHEATERS = 'GET_INTHEATERS'
const GET_COMMINGSOON = 'GET_COMMINGSOON'

export default{
	[GET_INTHEATERS](state,payload){
		state.inTheaters = payload.items;
	},
	[GET_COMMINGSOON](state,payload){
		state.commingSoon = payload.items;
	}
}
export default function(state = [], action){
	switch(action.type){
		case "SEARCH_TICKER":
			return action.payload.data;
		default:
			return state;
	}
}
export default function(state = true, action){
	switch(action.type){
		case "REMOVE_OFFSET_ACTION":
			return false;
		case "ADD_OFFSET_ACTION":
			return true;
		default:
			return state;
	}
}
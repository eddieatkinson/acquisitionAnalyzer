export default function(state = [], action){
	switch(action.type){
		case "GET_TARGETS_ACTION":
		case "DELETE_TARGET_ACTION":
		case "DISPLAY_DELETED_ACTION":
		case "REACTIVATE_TARGET_ACTION":
		case "UPDATE_TARGET_ACTION":
			return action.payload.data;
		default:
			return state;
	}
}
export default function(state = [], action){
	switch(action.type){
		case "LOGIN_ACTION":
		case "REGISTER_ACTION":
		case "UPDATE_PROFILE_ACTION":
			console.log(action.payload.data);
			return action.payload.data;
		default:
			return state;
	}
}
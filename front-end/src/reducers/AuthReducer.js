export default function(state = [], action){
	switch(action.type){
		case "LOGIN_ACTION":
		case "REGISTER_ACTION":
			console.log(action.payload.data);
			return action.payload.data;
		default:
			return state;
	}
}
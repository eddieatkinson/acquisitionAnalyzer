export default function(state = false, action){
	switch(action.type){
		case "ADD_COMPANY_ACTION":
			return true;
		default:
			return false;
	}
}
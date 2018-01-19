import axios from 'axios';

export default function(targetId, companyName){
	console.log("Reactivate target action is running......so FAST!");
	var axiosPromise = axios.get(`${window.apiHost}/reactivateTarget/${targetId}/${companyName}/get`);
	return{
		type: "REACTIVATE_TARGET_ACTION",
		payload: axiosPromise
	}
}
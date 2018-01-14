import axios from 'axios';

export default function(companyName){
	console.log("Get targets action is running......so FAST!");
	var axiosPromise = axios.get(`${window.apiHost}/targets/${companyName}/get`);
	return{
		type: "GET_TARGETS_ACTION",
		payload: axiosPromise
	}
}
import axios from 'axios';

export default function(targetId){
	console.log("Get target info is running......so FAST!");
	var axiosPromise = axios.get(`${window.apiHost}/targetInfo/${targetId}/get`);
	return{
		type: "GET_TARGET_INFO",
		payload: axiosPromise
	}
}
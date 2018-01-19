import axios from 'axios';

export default function(targetId, companyName){
	console.log("Delete target action is running......so FAST!");
	var axiosPromise = axios.get(`${window.apiHost}/deleteTarget/${targetId}/${companyName}/get`);
	return{
		type: "DELETE_TARGET_ACTION",
		payload: axiosPromise
	}
}
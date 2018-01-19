import axios from 'axios';

export default function(companyName){
	console.log("DISPLAY_DELETED_ACTION is running......so FAST!");
	var axiosPromise = axios.get(`${window.apiHost}/deletedTargets/${companyName}/get`);
	return{
		type: "DISPLAY_DELETED_ACTION",
		payload: axiosPromise
	}
}
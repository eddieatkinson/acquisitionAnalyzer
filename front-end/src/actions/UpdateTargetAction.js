import axios from 'axios';

export default function(formData){
	console.log('==================');
	console.log(formData);
	console.log('==================');
	console.log("Update target action is running......so FAST!");
	var axiosPromise = axios({
		url: `${window.apiHost}/updateTarget`,
		method: "POST",
		data: formData
	});
	return{
		type: "UPDATE_TARGET_ACTION",
		payload: axiosPromise
	}
}
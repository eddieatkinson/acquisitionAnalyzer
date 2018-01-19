import axios from 'axios';

export default function(formData){
	console.log('==================');
	console.log(formData);
	console.log('==================');
	console.log("Update profile action is running......so FAST!");
	var axiosPromise = axios({
		url: `${window.apiHost}/updateProfile`,
		method: "POST",
		data: formData
	});
	return{
		type: "UPDATE_PROFILE_ACTION",
		payload: axiosPromise
	}
}
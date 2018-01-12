import axios from 'axios';

export default function(formData){
	console.log('==================');
	console.log(formData);
	console.log('==================');
	console.log("Login action is running......so FAST!");
	var axiosPromise = axios({
		url: `${window.apiHost}/login`,
		method: "POST",
		data: formData
	});
	return{
		type: "LOGIN_ACTION",
		payload: axiosPromise
	}
}
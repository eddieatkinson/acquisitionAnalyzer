import axios from 'axios';

export default function(formData){
	console.log('==================');
	console.log(formData);
	console.log('==================');
	console.log("Register action is running......so FAST!");
	var axiosPromise = axios({
		url: `${window.apiHost}/register`,
		method: "POST",
		data: formData
	});
	return{
		type: "REGISTER_ACTION",
		payload: axiosPromise
	}
}
import axios from 'axios';

export default function(formData){
	console.log('==================');
	console.log(formData);
	console.log('==================');
	console.log("Add company action is running......so FAST!");
	var axiosPromise = axios({
		url: `${window.apiHost}/addCompany`,
		method: "POST",
		data: formData
	});
	return{
		type: "ADD_COMPANY_ACTION"
	}
}
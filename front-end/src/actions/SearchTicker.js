import axios from 'axios';

export default function(tickerSymbol){
	console.log("SEARCH_TICKER is running......so FAST!");
	var axiosPromise = axios.get(`${window.apiHost}/searchTicker/${tickerSymbol}/get`);
	return{
		type: "SEARCH_TICKER",
		payload: axiosPromise
	}
}
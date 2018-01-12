import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer
});

export default rootReducer;
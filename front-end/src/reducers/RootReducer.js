import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';
import TargetsAddedReducer from './TargetsAddedReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer,
	targetsAdded: TargetsAddedReducer
});

export default rootReducer;
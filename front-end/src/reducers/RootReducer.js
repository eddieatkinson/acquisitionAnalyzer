import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';
import TargetsAddedReducer from './TargetsAddedReducer';
import TargetInfoReducer from './TargetInfoReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer,
	targetsAdded: TargetsAddedReducer,
	targetInfo: TargetInfoReducer
});

export default rootReducer;
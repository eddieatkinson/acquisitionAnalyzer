import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TargetsReducer from './TargetsReducer';
import TargetsAddedReducer from './TargetsAddedReducer';
import TargetInfoReducer from './TargetInfoReducer';
import SearchResultsReducer from './SearchResultsReducer';
import ColOffsetReducer from './ColOffsetReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	targets: TargetsReducer,
	targetsAdded: TargetsAddedReducer,
	targetInfo: TargetInfoReducer,
	searchResults: SearchResultsReducer,
	colOffset: ColOffsetReducer
});

export default rootReducer;
import {combineReducers} from 'redux';
import groups from './groups.reducer';

const reducer = combineReducers({
    groups,
});

export default reducer;

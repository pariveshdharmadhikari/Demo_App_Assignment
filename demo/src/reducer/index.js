import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import PostReducer from './UserReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

//combineReducer method to combine all reducers. 
export default combineReducers(
    {
        posts:PostReducer,
        form:formReducer,
        toastr: toastrReducer
    }
)
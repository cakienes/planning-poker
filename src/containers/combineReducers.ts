import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from '../redux/session/session.reducer';

export default combineReducers({
    form: formReducer,
    session: sessionReducer,
    toastr: toastrReducer,
});

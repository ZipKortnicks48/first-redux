import {combineReducers} from 'redux';
import articleListReducers from './ArticleListReducer'
import {reducer as formReducer} from 'redux-form'
const rootReducer = combineReducers({
    articleListReducers,
    form:formReducer,
});

export default rootReducer;
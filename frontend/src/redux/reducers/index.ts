import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import userArticleReducer from './userArticleReducer';

const reducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   userArticle: userArticleReducer,
   article: articleReducer,
});

export default reducer;

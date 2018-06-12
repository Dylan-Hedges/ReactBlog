import { combineReducers } from 'redux';
//Takes the "reducer" property from 'redux-form' and assigns it to the alias "formReducer" (this is because "reducer" is not very specific and could be used by another library causing problems, it is reccomended by Redux-Form to use an alias)
import {reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

//"posts: PostsReducer" - applies our Posts Reducer to the "posts" piece of state (global/app level); "form: formReducer" - applies Redux-Form to the "form" piece of state (global/app level)
const rootReducer = combineReducers({
    posts: PostsReducer,
    form: formReducer
});

export default rootReducer;

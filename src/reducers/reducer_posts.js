//Used to access "_mapKeys()"
import _ from 'lodash';
//Dont need to specify file when importing from "index.js"
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

//"_.mapKeys(VARAIBLE containing array of posts, PROPERTY we want to use as the Key)" (part of "lodash") - takes our array of objects, extracts the "id:", creates a series of objects where Key = "id:" / Value = the post;
export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            //Removes id after deleting post - Looks at the state object, if it has a key of the deleted posts id (stored in "action"), drop it and return a new state object (id had been removed - not mandatory but cleans up the app state); "_.omit" - lodash helper
            return _.omit(state, action.payload);
        case FETCH_POST:
            // "...state" - Takes all the exisiting posts; "[action.payload.data.id]" - key interpolation, make a new KEY on this object using the "id"; ": action.payload.data" - set its VALUE to action.payload.data
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        default: 
            return state;
    }
}

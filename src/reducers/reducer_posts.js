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
            console.log(action);
            // "...state" - Takes all the exisiting posts we have fetched out of the state object and put them into a new object also called state; Create a new K/V pair "[action.payload.data.id]: action.payload.data" - creates a new KEY/VALUE pair with "action.payload.data.id" as the KEY and  "action.payload.data" as the VALUE
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
          console.log(action);
            //"_.mapKeys() - "action.payload.data" takes in an array (i.e our array of posts objects), '_id.$oid' tells _mapKeys() the property we want to use as the key (9.126)
            return _.mapKeys(action.payload.data, '_id.$oid');
        default:
            return state;
    }
}

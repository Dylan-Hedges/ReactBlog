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
        //Makes Ajax request for post when user navigates manually -  if the user goes to the homepage first they get all the posts (see fetchPosts() action creator) we then take the id (see FETCH_POSTS) and map it to the end of the URL (see posts_index.js -> <li>) which takes the user to that post when they click the title, however if the user does not go to the homepage we have no list of posts and cannot do these steps, therefore we need to make a seperate Ajax requests that gets this individual post so that we have data to display
        case FETCH_POST:
            console.log(action);
            // "...state" - Takes all the exisiting posts we have fetched out of the state object and put them into a new object also called state; Create a new K/V pair "[action.payload.data.id]: action.payload.data" - creates a new KEY/VALUE pair with "action.payload.data.id" as the KEY and  "action.payload.data" as the VALUE
            return { ...state, [action.payload.data._id.$oid]: action.payload.data };
        case FETCH_POSTS:
          console.log(action);
            //"_.mapKeys() - "action.payload.data" takes in an array (i.e our array of posts objects), '_id.$oid' tells _mapKeys() to take the id off each object and use it as they key, when the user clicks a post title this key will be added to the URL to take them to the individual post (9.126)
            return _.mapKeys(action.payload.data, '_id.$oid');
        default:
            return state;
    }
}

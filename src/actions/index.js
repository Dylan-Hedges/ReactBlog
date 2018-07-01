//"axios" - makes requests to the blog API; "redux-promise" - handles asynchronous elements of request
import axios from 'axios';
import keys from '../keys/keys';

//Action types defined here and not in the function because its easier to change and manage
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

//Root URL = base URL, we change the end depending on if its a GET, POST or DELETE
const ROOT_URL = `${keys.rootUrl}`;
const API_KEY = `${keys.apiKey}`;

//-----------------------------ACTION CREATORS--------------------------------
//--------FETCH all posts-------------------
export function fetchPosts(){
    //Executes request using the Axios library
    const request = axios.get(`${ROOT_URL}/posts/${API_KEY}`);
    //"payload: request" - assigns the request to the payload property, because of this the middleware (redux-promise) we set in "index.js" will automatically resolve this request when it sees this action, by the time the acton reaches the reducer it will contain the response from Axois (a big array of posts)
    console.log(request);
    return{
        type: FETCH_POSTS,
        payload: request
    };
}
//-----------CREATE new post-----------------
export function createPost(values, callback){
    //Performs a POST request using Axios, constructs a URL using the base URL + "/posts" + the API Key and sends then sends a POST request containing the form values typed by the user; ".then(() => callback()" - once the promise has resolved, execute the callback function (passed in from post_new.js) which sends the user back to the homepage (this way it wont redirect the user until the post has been created)
    const request = axios.post(`${ROOT_URL}/posts/${API_KEY}`, values)
        .then(() => callback());
    console.log(request);
    return {
        type: CREATE_POST,
        payload: request
    }
}
//--------FETCHES individual post----------
//(id) pass in the id of the post we want to fetch - we dont use the big list of posts called in fetchPosts() we make a new Ajax requst to only get the data we need
export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
        console.log(request);
    return {
        type: FETCH_POST,
        payload: request
    }
}
//----------DELETES post--------------
//Executes an Ajaax POST request to the API; "".then(() => callback" - when the request is successfully completed, executes the callback function passed in, returns the user back to the homepage
export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => callback());
            console.log(request);
    return {
        type: DELETE_POST,
        payload: id
    }
}

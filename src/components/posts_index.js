//Imported to access the lodash map helper
import _ from 'lodash';
import React, { Component } from 'react';
//Allows us to wire our component <-> action creator (fetches list of posts)
import { connect } from 'react-redux';
//Allows users to navigate, similar to the <a> tag, users can click on links to get taken to another react component
import { Link } from 'react-router-dom';
//Imports fetchPosts action creator
import { fetchPosts } from '../actions';
import classes from './style.css';

//"componentDidMount()" - a lifecycle method, React will automatically execute whatever is inside this method as soon as component is rendered on screen, fetching data is asynchronous (takes time to respond) and there is no way to tell React to hold off rendering components (it will render components as quickly as possible) so it doesnt matter if the request is executed before or after rendering
class PostsIndex extends Component {
    componentDidMount(){
        //Kicks off the data loading process
        this.props.fetchPosts();
    }
    //_.map() - lodash map helper that returns an array of posts, "this.props.posts, post => " loops through each post and stores it in "post" then executes the function, "post.title" renders the post title on screen, as this is an object that contains a list of posts and not an Array, we cannot use the built in array helper (".map")
    renderPosts(){
        return _.map(this.props.posts, post => {
          console.log(post);
            //key={post._id.$oid} - this key is mapped in reducer_posts.js -> FETCH_POSTS
            return (
              <div className="row">
                <li className="list-group-item" key={post._id.$oid}>
                  <Link to={`/posts/${post._id.$oid}`}>{post.title}</Link>
                  <img src={post.categories} className={classes.imageStyle}/>
                  <p>{post.content}</p>
                </li>
              </div>
            );
        });
    }
    //If we console.log(this.props.posts); this there will be 2 console logs - 1st = the component is rendered with no posts, 2nd = the component is rerendered with the blogposts once the Ajax request is complete (promise is resolved, state is recalculated, component rerendered with prop = posts); <Link> allows users to navigate (similar to the <a> tag but doesnt go to a server, instead displays components, still showing as <a> in inspector? - behind the scenes React-Router uses event handlers to change its behavior)
    render() {
        return (
            <div className="container">
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
                <Link className="btn btn-primary" to="/posts/new">
                      Add a post
                </Link>
            </div>
        );
    }
}

//mapStateToProps() - allows component to access the list blogposts for rendering on screen, takes the blogposts in our App level state and maps it to the props of this component (the component accesses the blogposts via its properties)
function mapStateToProps(state){
    return { posts: state.posts };
}

//Wires our component <-> action creator - instead of passing in "mapStateToProps" we pass in the Action Creator directly (it is the same, however sometimes we do need to break it out), So far when we want to wire our Action Creator to a component we used "mapStateToProps()" (so we can call it off the props object)
export default connect (mapStateToProps, { fetchPosts: fetchPosts })(PostsIndex);

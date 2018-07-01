import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    //As soon as the component appears on screen, fetch the post
    componentDidMount() {
        //Takes post id and assigns it in a variable called "id" - "this.props.match.params" is provided to us directly from react-router, ".match" - top level property, ".params" - an object that list all the different wildcards that exist inside the URL (e.g we might havd :id and :commentid), ".id" - specifies we only want the post id
        const { id } = this.props.match.params;
        //Executes the action creator to fetch the post and passes in the post id
        this.props.fetchPost(id);
    }
    onDeleteClick() {
        //Looks at the "params" object - contains the id for each post
        const { id } = this.props.match.params;
        //Calls action creator - Passes the post's id to the action creator (which will delete the post, sends an Ajax request); () => {this.props.history.push('/')} - returns the user back to the posts homepage after we delete the post, we pass this function as a 2nd argument to the action creator
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {
        //Extract only the post from the components props
        const { post } = this.props;
        //On page load, display a loading message - checks if post exisits
        if (!post) {
            return <div>Loading...</div>;
        }
        //Returns elements displayed on screen; ".bind(this)" - we need to bind because we are using "this" on the ".onDeleteClick()" callback function
        return (
            <div className="container">
              <div>
                <h3>Title: {post.title}</h3>
                <h6><strong>Categories:</strong> {post.categories}</h6>
                <p><strong>Content:</strong> {post.content}</p>
              </div>
              <div>
                <Link to="/" className="btn btn-primary pull-xs-right">
                  Back to Index
                </Link>
              </div>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>

            </div>
        );
    }
}

//Takes the list of posts from our App level state and maps it to the props of this component, "{ posts }" - takes only the big object/list of posts from the App level state, we dont need the whole state, "ownProps" - the object ({ posts }) that is sent to the component; In large apps its not uncommon to have the "mapStateToProps()" function in a seperate file
function mapStateToProps({ posts }, ownProps) {
    //Selects & returns the post from the list of posts - Matches the posts id and returns/maps only that post to the component
    return { post: posts[ownProps.match.params.id] };
    console.log(posts);
}

//Wires the action creator and executes the mapStateToProps function on this component
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

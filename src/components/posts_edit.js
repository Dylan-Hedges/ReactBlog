import React, { Component } from 'react';
//"reduxForm" - only handles state and validation for our form (does not help to save data to the DB or making a POST request), we have to do that), a helper that allows the component to communicate with the 'redux-form' reducer in the index.js reducers file -> the Redux store (similar to the Connect helper)
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import { fetchPost } from '../actions';

class PostsEdit extends Component {
  //As soon as the component appears on screen, fetch the post
  componentDidMount() {
      //Takes post id and assigns it in a variable called "id" - "this.props.match.params" is provided to us directly from react-router, ".match" - top level property, ".params" - an object that list all the different wildcards that exist inside the URL (e.g we might havd :id and :commentid), ".id" - specifies we only want the post id
      const { id } = this.props.match.params;
      //Executes the action creator to fetch the post and passes in the post id
      this.props.fetchPost(id);

  }
    //(field) - an object that contains event handlers, tells the <Field> to display the <input>, we wire up to the JSX we are returning; {...field.input} - an object that contains event handlers and props (e.g onChange={field.input.onChange}), wires the event handlers etc. to the <input> tag under its props; "{field.meta.error}" - displays errors to users; ? - a turnary expression, everything before the "?" is evaluated, if it returns a TRUE value, then it resolves with whatever is between the "?" and the ":", if it is a FALSE value, then it resolves with whatever is after the ":"
    renderField(field){
        //"field.meta.touched && field.meta.error" - ternary expression, if the user has touched the field AND there is an error, ? 'has-danger' : - then apply the 'has-danger' class (red), : '' - else apply no class
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
        //{field.meta.touched ? field.meta.error: ''} - ternary expression, the error message, if the user clicked in the field -> clicked out & has not met the validation requirements, then show the error message, otherwise just show an empty string; "meta.touched" - tracked internally by Redux-Form, user has focused on/clicked on this input then focused out/clicked out; {...field.input} takes field object and maps it as props to <input>
        var value;
        if (field.input.name === "title"){
          value = field.title.title;
        }else if (field.input.name === "imageurl"){
          value = field.imageurl.imageurl;
        }else if (field.input.name === "content"){
          value = field.content.content;
        }
        return(
            <div className={className}>
            <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                    value={value}
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error: ''}
                </div>
            </div>
        );
    }
    //When the user clicks the submit button
    onSubmit(values) {
        //Sends the values of the form + a callback function to the "createPost" action creator (actions -> index.js)
        this.props.createPost(values, () => {
            //Sends the user back to the posts page
            this.props.history.push('/');
        });
    }
    //<Field> - keeps track of data, knows how to interact with Redx-Form (action creators, event handlers etc.) but doesnt know how to display itself on screen; name="title" - a property what piece of state this field will produce; componment={} - shows the field on the screen, interacts directly with the user, a function that returns JSX; this.renderTitleField - we dont include () as the <Field> will call the function at some point in the future (using "()" will call it straight away)
    render() {
        //Performs Redux-Form validation checks - Pulls off the "handleSubmit" function that was passed into the component from Redux-Form (when we did "export default reduxForm")
        const { handleSubmit } = this.props;
        console.log(this.props.post);
        const {title} = this.props.post;
        const {imageurl} = this.props.post;
        const {content} = this.props.post;
        //"onSubmit" - when the form is submitted; "handleSubmit" - Redux-Form performs validation checks; "this.onSubmit.bind(this)" - then execute the function we defined // component={} - a prop that lets us include JSX for our Field component (the Field component only knows how to interact with Redux Form, it doesnt know how to show itself on screen)
        return(
          <div className= "container">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    props={{
                        type: 'text'
                    }}
                    component={this.renderField}
                    {...{
                        title: {title}
                    }}
                />
                <Field
                    label="Image URL"
                    name="imageurl"
                    props={{
                        type: 'text'
                    }}
                    component={this.renderField}
                    {...{
                        imageurl: {imageurl}
                    }}
                />
                <Field
                    label="Post Content"
                    name="content"
                    props={{
                        type: 'text'
                    }}
                    component={this.renderField}
                    {...{
                        content: {content}
                    }}
                />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to ="/" className="btn btn-danger">Cancel</Link>
            </form>
          </div>
        );
    }
}
//validate() - a function that checks form is complete and has valid input (all fields are filled out), when user tries to submit the form this function will execute; "(values)" = the values the user has entered (e.g title: 'New Post', categories: '', content'asdsadas')
function validate(values){
    //Creates the errors object - if we return an empty object Redux-Form assumes nothing is wrong with form and its fine to submit; if we return an object with something inside it Redux-Form will assume there is an issue and not submit the form
    const errors ={};
    //If the user did not enter a title (can add additonal validation here e.g "|| values.title.length < 3")
    if (!values.title) {
        //add a property called title to the errors object, once this gets added and then returned Redux-Form will know there is an issue with the form and not submit
        errors.title = "Enter a title";
    }
    if (!values.imageurl) {
        errors.imageurl = "Enter a valid URL";
    }
    if (!values.content) {
        errors.content = "Enter some content";
    }
    //Returns error object - returns either an empty object (form has no errors -> submit) or an object containing properties (form has errors -> dont submit)
    return errors;
}

//Takes the list of posts from our App level state and maps it to the props of this component, "{ posts }" - takes only the big object/list of posts from the App level state, we dont need the whole state, "ownProps" - the object ({ posts }) that is sent to the component; In large apps its not uncommon to have the "mapStateToProps()" function in a seperate file
function mapStateToProps({ posts }, ownProps) {
    //Selects & returns the post from the list of posts - Matches the posts id and returns/maps only that post to the component
    return { post: posts[ownProps.match.params.id] };
}

//"reduxForm" - allows component to communicate with the Redux-Form reducer, also adds loads of additonal properties that are passed to our component (e.g pulling off "handleSubmit"); form: 'PostsNewForm' - the name for this specific form (has to be a unique string, otherwise states from other forms with the same name will merge together), sometimes we might have multiple forms on the screen at the same time (e.g sign up and sign in) this helps to isolate different forms and their states; connect(null,{ createPost })(PostsNew) - wires up our new post action creator to our component
export default reduxForm({
    validate: validate,
    form: 'PostsEditForm'
})(
    connect(mapStateToProps,{ createPost, fetchPost })(PostsEdit)
);

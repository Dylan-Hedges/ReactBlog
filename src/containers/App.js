import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//BrowserRouter - an component/object that interacts with the history library and decides what to do based on the URL change (looks at entire URL); Route - a component/object that checks URL and identifies the component to be shown (can render inside of any other component); Switch - matches exact URL to exact route (routes are nested inside statement), React matches paths lazily, if you have "/" and "/posts" it will show both components as they both have a "/"
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//redux-promise - handles asynchronous elements of requests to SG Blog API (implemented as middleware)
import promise from 'redux-promise';
import reducers from '../reducers';
import PostsIndex from '../components/posts_index';
import PostsNew from '../components/posts_new';
import PostsShow from '../components/posts_show';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


//Root component
class App extends Component {
     constructor(props){
         super(props)
         this.state = {
         };
     }
     //"/:id" this is a wildcard - will take whatever is after the "/" and pass it as a prop to our URL, needs to come before "/new" otherwise it would take "new" as the wildcard
     render(){
         return(
           <Provider store={createStoreWithMiddleware(reducers)}>
             <BrowserRouter>
               <div>
                 <Switch>
                   <Route path="/posts/new" component={PostsNew} />
                   <Route path="/posts/:id" component={PostsShow} />
                   <Route path="/" component={PostsIndex} />
                 </Switch>
               </div>
             </BrowserRouter>
           </Provider>
         );
     }
 }

export default App;

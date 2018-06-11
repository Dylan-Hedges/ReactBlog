import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import keys from './keys/keys';
import classes from './style.css';
import Aux from './hoc/Aux_file.js';

//Youtube API key
const API_KEY = `${keys.youtubeKey}`;

//Root component
class App extends Component {
     constructor(props){
         super(props)
         this.state = {
         };
     }
     //Renders components to the page
     render(){
         return(

           <p>Home page</p>

         );
     }
 }

export default App;

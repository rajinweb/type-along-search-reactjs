
import React from 'react';
import ReactDOM from 'react-dom';
import MetaTags from 'react-meta-tags';

import './css/bootstrap.min.css';
import './css/index.css';

import Login from './App';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

class Meta extends React.Component {
  render() {
    return (
        <div className="wrapper">
          <MetaTags>
            <title>GoCanvas: Mobile Business Apps and Forms on Android, iPad, iPhone</title>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta id="view_port" name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
          </MetaTags>
         <div id="wrapper">done</div>
        </div>
      );
  }
}



ReactDOM.render(<Meta/>, document.querySelector('#root'));
ReactDOM.render(<Login/>, document.querySelector('#wrapper'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

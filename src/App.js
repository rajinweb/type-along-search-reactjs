import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './type-along-search';

import canvasLogo from './images/logo.svg';
import './css/header.css';

//Luke Skywalker / 19BBY

class Login extends Component {
   constructor(props) {
    super(props);
    this.state = {
    	name:"",
    	birth_year:"",
      error: null,
      isLoaded: false,
      items: []

    };
  //  this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  validateForm = () => {
    return this.state.name.length > 0 && this.state.birth_year.length > 0;
  }

  
  handleChange=(event)=>{
 		this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
 
    event.preventDefault();
	  var loggedIn=false;
    const { name, birth_year } = this.state
    this.state.items.filter(function(item, index, array) {
      if(item.name === name && item.birth_year === birth_year){
        loggedIn=true
      }
      return loggedIn;
    });

    if(loggedIn){
      sessionStorage.setItem('logedInReactPlanetApp',true);
      sessionStorage.setItem('loginName', name);
      ReactDOM.render(<App user={this.setState.name}/>, document.querySelector('#wrapper'));

    }else{
      //ReactDOM.render(<App user={this.state.items.name}/>, document.querySelector('#wrapper'));
        alert('username or password is incorrect');
       ReactDOM.render(<Login/>, document.querySelector('#wrapper'));
      
    }
    
  }

componentDidMount(){
    fetch("https://swapi.co/api/people").then(res => res.json()).then((result) => {
      console.log(result)
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
       return <Loader loaderIsVisible={true}/>;
    } else {

      return (
        <form validate="true"   onSubmit={this.handleSubmit} autoComplete="off">
          <div className="col-3 container-fluid jumbotron p-3" style={{marginTop: 100 +'px'}}>
            <div className="form-group">
              <label className="control-label">Username</label>
              <input type="text" className="form-control" placeholder="Please Enter username" required autoComplete="off"  name="name"  onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                 <label className="control-label">Password</label>
                 <input type="password" className="form-control" placeholder="Please password" required autoComplete="new-password"  name="birth_year"  onChange={this.handleChange}  />
             </div>
             <div className="form-group">
                 <input type="submit" disabled={!this.validateForm()} className="form-control" value="Login"/>
             </div>
          </div>
        </form>
      );
  }
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoader: true
    }
  }

  componentDidMount(){
    var _self= this;
    setTimeout(() =>{
          _self.setState({
            isLoader: false
          });
          document.body.style.paddingTop= document.querySelector('header').clientHeight + 'px';
          },1000);
  }

  logout = () =>{
    sessionStorage.removeItem('logedInReactPlanetApp');
    sessionStorage.clear();
    ReactDOM.render(<Login/>, document.querySelector('#wrapper'));
  }

  render() {
    if (this.state.isLoader) {
       return <Loader loaderIsVisible={true}/>; 
    }else{
       
      return (
          <>
          
          <header className="bg-secondary clearfix fixed-top form-row">
            <div className="col-2 p-0 float-left">
             <img src={canvasLogo} className="float-left w-25" alt="logo" /><div className="float-left m-2 text-white">React Planet App</div>
            </div>
            <div className="badge-pill bg-info border-left col-10 float-left p-1 rounded-right text-white"> 
            <div className="form-check form-text col-11 float-left"> Welcome <small>{ sessionStorage.getItem('loginName') || this.props.user }</small></div>  
            <button className="btn btn-link float-right mx-3 p-0 text-right text-white"  onClick={this.logout}><small>Logout</small></button>
            </div>
          </header>
          <div className="container">
           <Search/>
          </div>

        </>
       );
    }
  }
}

class Loader extends Component {
  render() {
    return <div className="h-100 position-fixed text-center w-100" style={{display:this.props.loaderIsVisible ? 'block': 'none', top: 0+'px', zIndex: 999, background: 'rgba(0,0,0,.6)'}}> <img src={canvasLogo} className="loader-spinner  w-25" alt="logo"/></div>
  }
}


export default sessionStorage.getItem('logedInReactPlanetApp') === "true" ? App : Login;

